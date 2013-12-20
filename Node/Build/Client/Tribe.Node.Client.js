// Client/setup.js
if (typeof (T) == 'undefined') T = {};
T.Types = T.Types || {};


// Client/PubSub.extensions.js
Tribe.PubSub.prototype.connect = function () {
    
};

Tribe.PubSub.Channel.prototype.connect = function (topics) {
    var self = this;
    
    T.hub.join(this.id);
    this.subscribe(topics || '*', function(data, envelope) {
        T.hub.publish(envelope);
    });

    var end = this.end;
    this.end = function () {
        T.hub.leave(self.channelId);
        end();
    };
    
    return this;
};

// Client/Types/Hub.js
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
