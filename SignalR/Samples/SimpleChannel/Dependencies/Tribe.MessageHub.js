Tribe = window.Tribe || {};
Tribe.SignalR = Tribe.SignalR || {};

Tribe.SignalR.Client = function (pubsub, hub, publisher) {
    var self = this;
    
    hub.client.acceptServerMessage = function (data) {
        var envelope = JSON.parse(data);
        envelope.server = true;
        pubsub.publish(envelope);
    };

    this.publishToServer = function(channelId, envelope) {
        publisher.publishToServer(channelId, envelope);
    };

    this.joinChannel = function (id, serverEvents) {
        var lifetime;

        $.connection.hub.start().done(function() {
            hub.server.joinChannel(id);
            relayMessages();
        });

        return {
            leave: function() {
                lifetime && lifetime.end();
                self.leaveChannel(id);
            }
        };

        function relayMessages() {
            if (serverEvents && serverEvents.length > 0) {
                lifetime = pubsub.createLifetime();
                lifetime.subscribe(serverEvents, function (data, envelope) {
                    self.publishToServer(id, envelope);
                });
            }
        }
    };

    this.leaveChannel = function(id) {
        hub.server.leaveChannel(id);
    };
};/*!
 * Based on ASP.NET SignalR JavaScript Library v1.0.0 http://signalr.net/
 * License at https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 */

(function () {
    if (typeof ($.signalR) !== "function")
        window.console && window.console.log &&
            window.console.log("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before Tribe.js");

    window.TMH = {
        initialise: function (pubsub, url) {
            initialiseSignalR(url || '/signalr');
            $.extend(TMH, new Tribe.SignalR.Client(
                pubsub,
                $.connection.hubImplementation,
                new Tribe.SignalR.Publisher($.connection.hubImplementation)));
        },
        publishToServer: notInitialised,
        joinChannel: notInitialised,
        leaveChannel: notInitialised
    };
    
    function notInitialised() {
        throw "Tribe.SignalR must be initialised before use by calling TMH.initialise(pubsub, url)";
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
                joinChannel: function (channelId) {
                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge(["JoinChannel"], $.makeArray(arguments)));
                },

                leaveChannel: function (channelId) {
                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge(["LeaveChannel"], $.makeArray(arguments)));
                },

                publish: function (channelId, message) {
                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge(["Publish"], $.makeArray(arguments)));
                }
            };

            return proxies;
        };

        signalR.hub = $.hubConnection(url, { useDefaultPath: false });
        $.extend(signalR, signalR.hub.createHubProxies());
    }
})();
Tribe = window.Tribe || {};
Tribe.SignalR = Tribe.SignalR || {};

Tribe.SignalR.Publisher = function (hub) {
    var self = this;
    var queue = [];

    this.publishToServer = function(channelId, envelope) {
        if (!envelope.server) {
            if (connected())
                hub.server.publish(channelId, JSON.stringify(envelope));
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
};Tribe.PubSub.prototype.joinChannel = function(channelId) {
    TMH.joinChannel(channelId);
};

Tribe.PubSub.Lifetime.prototype.joinChannel = function(channelId) {
    var endLifetime = this.end;
    var channel = TMH.joinChannel(channelId);

    this.end = function() {
        channel.leave();
        endLifetime();
    };
};