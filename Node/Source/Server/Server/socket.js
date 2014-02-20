module.exports = {
    start: function (server) {
        var io = require('socket.io').listen(server),
            log = resolve('/logger'),
            sagas = resolve('/Handlers/sagas'),
            options = resolve('/options');

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
    }
};