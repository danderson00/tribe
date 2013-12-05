Tribe = window.Tribe || {};
Tribe.SignalR = Tribe.SignalR || {};

Tribe.SignalR.Client = function (pubsub, hub, publisher) {
    hub.client.acceptServerMessage = function (data) {
        var envelope = JSON.parse(data);
        envelope.server = true;
        pubsub.publish(envelope);
    };


    this.createSession = function (serverEvents) {
        var lifetime = pubsub.createLifetime();

        if (!connected())
            $.connection.hub.start();

        subscribeToEvents(lifetime, serverEvents, publisher.publishToServer);

        return {
            end: lifetime.end
        };
    };

    this.createChannel = function (id, serverEvents) {
        var lifetime = pubsub.createLifetime();
        hub.server.createChannel(id);
        subscribeToEvents(lifetime, serverEvents, publishToChannel);

        function publishToChannel(envelope) {
            envelope.channelId = id;
            publisher.publishToServer(envelope);
        }

        return {
            end: lifetime.end
        };
    };

    this.subscribeToChannel = function (id) {
        hub.server.subscribeToChannel(id);
    };

    this.unsubscribeFromChannel = function (id) {
        hub.server.unsubscribeFromChannel(id);
    };

    function subscribeToEvents(lifetime, events, callback) {
        if (events && events.length > 0)
            lifetime.subscribe(events, function (data, envelope) {
                callback(envelope);
            });
    }

    function connected() {
        return hub.connection.state === $.signalR.connectionState.connected;
    }
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
            TMH.initialise = alreadyInitialised;
        },
        createSession: function() {
            throw "initialise must be called before createSession";
        }
    };

    function alreadyInitialised() {
        throw "Tribe.SignalR has already been initialised.";
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
                createChannel: function (channelId) {
                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge(["CreateChannel"], $.makeArray(arguments)));
                },
                closeChannel: function (channelId) {
                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge(["CloseChannel"], $.makeArray(arguments)));
                },
                publish: function (message, channelId) {
                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge(["Publish"], $.makeArray(arguments)));
                },
                subscribeToChannel: function (channelId) {
                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge(["SubscribeToChannel"], $.makeArray(arguments)));
                },
                unsubscribeFromChannel: function (channelId) {
                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge(["UnsubscribeFromChannel"], $.makeArray(arguments)));
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

    hub.connection.stateChanged(function (change) {
        if (connected(change.newState))
            flushQueue();
    });

    function flushQueue() {
        // this is not good enough
        if (queue.length > 0)
            $.each(queue, function (index, envelope) {
                self.publishToServer(envelope);
            });
        queue = [];
    }

    this.publishToServer = function(envelope) {
        if (!envelope.server) {
            if (connected())
                hub.server.publish(JSON.stringify(envelope));
            else
                queue.push(envelope);
        }
    };
    
    function connected(state) {
        return state ?
            state === $.signalR.connectionState.connected :
            hub.connection.state === $.signalR.connectionState.connected;
    }
};