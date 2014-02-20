require('./resolve.js');

module.exports = {
    start: function (options) {
        var express = require('express'),
            app = express(),
            server = require('http').createServer(app),
            io = require('socket.io').listen(server),
            _ = require('underscore'),
            fs = require('q-io/fs'),
            log = resolve('/logger'),
            sagas = resolve('/Sagas'),
            store = resolve('/Store/fs'),
            pack = require('packscript').pack;

        // hack to get knockout working in sagas
        ko = require('knockout');

        applyDefaultOptions();
        configurePackscript();
        loadServerBuild();


        // server/http.js
        app.get('/', function (req, res) {
            fs.read(options.basePath + 'Build/index.html').then(function (data) {
                res.send(data);
            });
        });

        app.use('/Build/', express.static(options.basePath + 'build'));

        app.get('/Data/:partition/:row', function (req, res) {
            store.get(req.params.partition, req.params.row)
                .then(function (data) {
                    res.send(data);
                })
                .fail(function () {
                    res.status(404).end();
                });
        });

        server.listen(options.port);


        // server/socket.js
        io.sockets.on('connection', function (socket) {
            log.debug('connected...');
            
            socket.on('message', function (envelope) {
                socket.broadcast.to(envelope.channelId).emit('message', envelope);
                sagas.handle(envelope);
            });
            
            socket.on('join', function (channel) {
                log.debug('joined...');
                socket.join(channel);
            });

            socket.on('startSaga', function(data) {
                log.debug('starting saga ' + data.path);
                socket.join(data.id);
                sagas.start(data.path, data.id, data.data);
            });
        });


        // options.js
        function applyDefaultOptions() {
            options = _.extend({
                basePath: defaultBasePath(),
                port: 1678
            }, options);
            options.basePath = ensureTrailingSlash(options.basePath);
            store.basePath = options.basePath + 'Data/';
        }

        function defaultBasePath() {
            var path = process.argv[1];
            return path.substr(0, path.replace(/\\/g, '/').lastIndexOf('/')) + '/';
        }

        function ensureTrailingSlash(path) {
            return path.charAt(path.length - 1) === '/' ? path : path + '/';
        }


        // this is just sagas at the moment. It will be replaced by individual resource loading with require.
        function loadServerBuild() {
            require(options.basePath + 'Build/server.js');
        }


        // build.js
        function configurePackscript() {
            Pack.context.configPath = options.basePath;
            Pack.api.Log.setLevel('info');
            pack.options.throttleTimeout = 0;

            pack([
                T.scripts('Infrastructure', true),
                T.panes('Panes', true),
                T.sagas('Sagas', true)
            ]).to('Build/site.js');

            pack({
                include: [T.sagas('Sagas')],
                outputTemplate: 'TC.wrapper'
            }).to('Build/server.js');

            pack([T.scripts('Dependencies/*.js'), T.scripts('node_modules/tribe/client/*.debug.js')]).to('Build/dependencies.js');

            pack({ outputTemplate: 'index' }).to('Build/index.html');

            pack.scanForResources(__dirname + '/pack/')
                .all()
                .watch(options.basePath);
        }
    }
};