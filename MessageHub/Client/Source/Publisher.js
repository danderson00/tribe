Tribe = window.Tribe || {};
Tribe.MessageHub = Tribe.MessageHub || {};

Tribe.MessageHub.Publisher = function (hub) {
    var self = this;
    var queue = [];

    this.publishToServer = function(channelId, envelope, record) {
        if (!envelope.server) {
            if (connected())
                hub.server.publish(channelId, JSON.stringify(envelope), record === true);
            else
                queueMessage(channelId, envelope);
        }
    };
    
    function queueMessage(channelId, envelope) {
        queue.push(function() {
            self.publishToServer(channelId, envelope);
        });
    }
    
    hub.connection.stateChanged(function (change) {
        if (connected(change.newState))
            flushQueue();
    });

    function flushQueue() {
        if (queue.length > 0) {
            var oldQueue = queue;
            queue = [];
            $.each(oldQueue, function(index, queueItem) {
                queueItem();
            });
        }
    }

    function connected(state) {
        return state ?
            state === $.signalR.connectionState.connected :
            hub.connection.state === $.signalR.connectionState.connected;
    }
};