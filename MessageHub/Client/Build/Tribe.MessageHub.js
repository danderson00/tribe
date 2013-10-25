// client.js
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

    this.leaveChannel = function (id) {
        if (startConnection)
            $.when(startConnection).done(function() {
                hub.server.leaveChannel(id);
            });
    };
};
// initialise.js
/*!
 * Based on ASP.NET SignalR JavaScript Library v1.0.0 http://signalr.net/
 * License at https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 */

(function () {
    if (typeof ($.signalR) !== "function")
        window.console && window.console.log &&
            window.console.log("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before Tribe.js");

    window.TMH = {
        initialise: function (pubsub, url) {
            initialiseSignalR(url || 'signalr');
            $.extend(TMH, new Tribe.MessageHub.Client(
                pubsub,
                $.connection.hubImplementation,
                new Tribe.MessageHub.Publisher($.connection.hubImplementation)));
        },
        publishToServer: notInitialised,
        joinChannel: notInitialised,
        leaveChannel: notInitialised
    };
    
    function notInitialised() {
        throw "Tribe.MessageHub must be initialised before use by calling TMH.initialise(pubsub, url)";
    }

    function initialiseSignalR(url) {
        var signalR = $.signalR;

        function makeProxyCallback(hub, callback) {
            return function () {
                // Call the client hub method
                callback.apply(hub, $.makeArray(arguments));
            };
        }

        function registerHubProxies(instance, shouldSubscribe) {
            var key, hub, memberKey, memberValue, subscriptionMethod;

            for (key in instance) {
                if (instance.hasOwnProperty(key)) {
                    hub = instance[key];

                    if (!(hub.hubName)) {
                        // Not a client hub
                        continue;
                    }

                    if (shouldSubscribe) {
                        // We want to subscribe to the hub events
                        subscriptionMethod = hub.on;
                    } else {
                        // We want to unsubscribe from the hub events
                        subscriptionMethod = hub.off;
                    }

                    // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                    for (memberKey in hub.client) {
                        if (hub.client.hasOwnProperty(memberKey)) {
                            memberValue = hub.client[memberKey];

                            if (!$.isFunction(memberValue)) {
                                // Not a client hub function
                                continue;
                            }

                            subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                        }
                    }
                }
            }
        }

        $.hubConnection.prototype.createHubProxies = function () {
            var proxies = {};
            this.starting(function () {
                // Register the hub proxies as subscribed
                // (instance, shouldSubscribe)
                registerHubProxies(proxies, true);

                this._registerSubscribedHubs();
            }).disconnected(function () {
                // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
                // (instance, shouldSubscribe)
                registerHubProxies(proxies, false);
            });

            proxies.hubImplementation = this.createHubProxy('hubImplementation');
            proxies.hubImplementation.client = {};
            proxies.hubImplementation.server = {
                publish: function (channelId, message, record) {
                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge(["Publish"], $.makeArray(arguments)));
                },
                joinChannel: function (channelId) {
                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge(["JoinChannel"], $.makeArray(arguments)));
                },
                replayChannel: function (channelId) {
                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge(["ReplayChannel"], $.makeArray(arguments)));
                },
                leaveChannel: function (channelId) {
                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge(["LeaveChannel"], $.makeArray(arguments)));
                }
            };

            return proxies;
        };

        signalR.hub = $.hubConnection(url, { useDefaultPath: false });
        $.extend(signalR, signalR.hub.createHubProxies());
    }
})();

// Publisher.js
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
// PubSub.extensions.js
Tribe.PubSub.prototype.joinChannel = function(channelId, replayOrOptions) {
    TMH.joinChannel(channelId, replayOrOptions);
};

Tribe.PubSub.Lifetime.prototype.joinChannel = function (channelId, replayOrOptions) {
    var endLifetime = this.end;
    var channel = TMH.joinChannel(channelId, replayOrOptions);

    this.end = function() {
        channel.leave();
        endLifetime();
    };
};
