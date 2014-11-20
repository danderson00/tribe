var pubsub = require('tribe.pubsub'),
    socket;

var hub = module.exports = {
    connect: function () {
        socket = io.connect();

        socket.on('message', function (envelope) {
            envelope.origin = 'server';
            pubsub.publish(envelope);
        });
    },

    publish: function (envelope) {
        if (envelope.origin !== 'server' && !envelope.published) {
            // functions are not serialised. feels a bit hacky.
            envelope.published = function () { };
            return defer('message', envelope);
        }
    },

    actor: function (options) {
        return defer('actor', options);
    },

    subscribe: function (options) {
        return defer('subscribe', options);
    }
};

// *sigh* using jQuery promises on the client... a pain...
function defer(event, data) {
    var deferred = $.Deferred();

    if (!socket) hub.connect();

    // don't know why this timeout is required... only 'message' events are queued using emit??
    setTimeout(function () {
        socket.emit(event, data, function (result, err) {
            err ? deferred.reject(err) : deferred.resolve(result);
        });
    });

    return deferred.promise();
}
