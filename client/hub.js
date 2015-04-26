﻿var pubsub = require('tribe.pubsub'),
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
        if (envelope.origin !== 'server' && envelope.origin !== 'client') {
            envelope.origin = 'client';
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

function defer(operation, data) {
    var deferred = $.Deferred();

    if (!socket) hub.connect();

    // don't know why this timeout is required... only 'message' events are queued using emit??
    setTimeout(function () {
        socket.emit(operation, data, function (result, err) {
            err ? deferred.reject(wrapError(err)) : deferred.resolve(result);
        });
    });

    function wrapError(err) {
        return err.constructor !== Error
            ? new Error('An error occurred performing ' + operation + ' operation: ' + (err.constructor === String ? err : JSON.stringify(err)))
            : err;
    }

    return deferred.promise();
}
