Tribe = window.Tribe || {};
Tribe.MessageHub = Tribe.MessageHub || {};

Tribe.MessageHub.Client = function (pubsub, hub, publisher) {
    var self = this;

    var startConnection;
    
    hub.client.acceptServerMessage = function (data) {
        var envelope = JSON.parse(data);
        envelope.server = true;
        envelope.sync = true;
        pubsub.publish(envelope);
    };

    this.publishToServer = function(channelId, envelope, record) {
        $.when(startConnection).done(function() {
            publisher.publishToServer(channelId, envelope, record);
        });
    };

    // want to support:
    // (id)
    // (id, replay)
    // (id, { serverEvents, record, replay })
    this.joinChannel = function (id, replayOrOptions) {
        var lifetime;
        var options = replayOrOptions === true ?
            { replay: true } :
            (replayOrOptions || { });

        if(!startConnection)
            startConnection = $.connection.hub.start();
        
        $.when(startConnection).done(function () {
            hub.server.joinChannel(id);
            if (options.replay)
                hub.server.replayChannel(id);
        });
        relayMessages();

        return {
            leave: function() {
                lifetime && lifetime.end();
                self.leaveChannel(id);
            }
        };

        function relayMessages() {
            if (options.serverEvents && options.serverEvents.length > 0) {
                lifetime = pubsub.createLifetime();
                lifetime.subscribe(options.serverEvents, function (data, envelope) {
                    self.publishToServer(id, envelope, options.record);
                });
            }
        }
    };

    this.leaveChannel = function(id) {
        hub.server.leaveChannel(id);
    };
};