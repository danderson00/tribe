var channels = require('tribe/server/channels');

var statics = module.exports = {
    handlers: [],
    start: startHandlers,
    register: function (messageFilter, func) {
        statics.handlers.push({
            messageFilter: messageFilter,
            func: func
        });
    }
};

function startHandlers(envelope) {
    for (var i = 0, l = statics.handlers.length; i < l; i++) {
        var handler = statics.handlers[i];

        if ((typeof(handler.messageFilter) === "string" && envelope.topic === handler.messageFilter) ||
            (typeof(handler.messageFilter) === "function" && handler.messageFilter(envelope)))

            handleMessage(handler, envelope);
    }
}

function handleMessage(handler, envelope) {
    handler.func({
        publish: function (topic, data) {
            channels.broadcast({
                topic: topic,
                data: data,
                channelId: envelope.channelId
            });
        }
    }, envelope);
}