var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

module.exports = {
    start: function(port) {
        server.listen(port || 1678);
    }
};

io.sockets.on('connection', function (socket) {
    socket.on('message', function (envelope) {
        socket.broadcast.to(envelope.channel || 'defaultChannel').emit('message', envelope);
    });
});