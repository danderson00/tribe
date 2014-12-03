﻿module.exports = {
    start: function (operations) {
        var server = require('./http').server,
            io = require('socket.io').listen(server),
            log = require('tribe.logger'),
            pubsub = require('tribe.pubsub'),
            uuid = require('node-uuid'),
            _ = require('underscore');

        module.exports.io = io;

        io.sockets.on('connection', function (socket) {
            var clientId = uuid.v4(),
                address = socket.handshake.address,
                lifetime = pubsub.createLifetime();

            log.debug('Client connected - ' + address.address + ':' + address.port);

            _.each(operations, function (module, operation) {
                var handler = require(module);

                socket.on(operation, function (data, ack) {
                    handler(data, {
                        socket: socket,
                        pubsub: lifetime,
                        clientId: clientId,
                        ack: ack
                    });
                });
            });
            
            socket.on('disconnect', function () {
                lifetime.end();
            });
        });

        log.info('Accepting socket connections');
    }
};