T.Types.Hub = function (io, pubsub, options) {
    var socket = io.connect(options.socketUrl);

    socket.on('message', function (envelope) {
        envelope.origin = 'server';
        pubsub.publish(envelope);
    });

    this.publish = function(envelope) {
        if (!socket)
            throw 'Hub must be connected before calling publish';
        if(envelope.origin !== 'server')
            socket.emit('message', envelope);
    };

    this.join = function(channel) {
        socket.emit('join', channel);
    };
};