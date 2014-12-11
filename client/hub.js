var pubsub = require('tribe.pubsub'),
    Q = require('q'),
    socket;

var hub = module.exports = {
    connect: function () {
        socket = io.connect();

        socket.on('message', function (envelope) {
            // in some circumstances, emitting a message from the publish function below was causing the
            // message to be immediately sent back to this function, bypassing the server. NFI.
            // this if statement prevents "bouncing"
            if (envelope.origin !== 'server') {
                envelope.origin = 'server';
                pubsub.publish(envelope);
            }
        });
    },

    publish: function (envelope) {
        if (envelope.origin !== 'server' && !envelope.published) {
            // functions are not serialised. feels a bit hacky.
            envelope.published = function () { };
            return defer('message', envelope);
        }
    },

    scope: function (options) {
        return defer('scope', options);
    },

    actor: function (options) {
        return defer('actor', options);
    },

    subscribe: function (options) {
        return defer('subscribe', options);
    }
};

function defer(event, data) {
    var deferred = Q.defer();

    if (!socket) hub.connect();

    // don't know why this timeout is required... only 'message' events are queued using emit??
    setTimeout(function () {
        socket.emit(event, data, function (result, err) {
            err ? deferred.reject(err) : deferred.resolve(result);
        });
    });

    return deferred.promise;
}
