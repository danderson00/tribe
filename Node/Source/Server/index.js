module.exports = {
    start: function (options) {
        //var app = require('express')()
        //  , server = require('http').createServer(app)
        //  , io = require('socket.io').listen(server);

        //server.listen(1678);

        //app.get('/', function (req, res) {
        //    res.sendfile(__dirname + '/index.html');
        //});

        //io.sockets.on('connection', function (socket) {
        //    console.log('connected');
        //    socket.emit('news', { hello: 'world' });
        //    socket.on('my other event', function (data) {
        //        console.log(data);
        //    });
        //});

        var express = require('express'),
            app = express(),
            server = require('http').createServer(app),
            io = require('socket.io').listen(server),
            _ = require('underscore'),
            log = require('logger');

        applyDefaultOptions();

        app.use('/Build/', express.static(options.basePath + '/build'));
        server.listen(options.port);

        io.sockets.on('connection', function (socket) {
            log.debug('connected...');
            socket.on('message', function (envelope) {
                socket.broadcast.to(envelope.channelId).emit('message', envelope);
            });
            socket.on('join', function (channel) {
                log.debug('joined...');
                socket.join(channel);
            });
        });


        function applyDefaultOptions() {
            options = _.extend({
                basePath: process.cwd(),
                port: 1678
            }, options);
        }
    }
};