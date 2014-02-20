require('./resolve.js');

module.exports = {
    start: function (options) {
        var http = resolve('/Server/http'),
            socket = resolve('/Server/socket'),
            _ = require('underscore'),
            log = resolve('/logger'),
            pack = require('packscript').pack,
            store = resolve('/Store/fs');

        // hack to get knockout working in sagas
        ko = require('knockout');

        applyDefaultOptions();
        configurePackscript();
        loadServerBuild();

        var server = http.start(options);
        socket.start(server, options);

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