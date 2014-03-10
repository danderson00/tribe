﻿var Channel = require('tribe/types/Channel');
var channels = {};

var api = module.exports = {
    join: function (id, socket) {
        if (!channels[id]) channels[id] = new Channel(id);
        channels[id].join(socket);
    },
    leave: function (id, socket) {
        var channel = channels[id];
        if (channel) {
            channel.leave(socket);
            if (channel.clients.length === 0)
                delete channels[id];
        }
    },
    leaveAll: function (socket) {
        for (var channel in channels)
            if (channels.hasOwnProperty(channel))
                api.leave(channel.id, socket);
    },
    broadcast: function (envelope, origin) {
        var id = envelope.channelId;
        if (id && channels[id]) channels[id].broadcast(envelope, origin);
    },
    broadcastTo: function (id, envelope, origin) {
        envelope.channelId = id;
        api.broadcast(envelope, origin);
    }
};