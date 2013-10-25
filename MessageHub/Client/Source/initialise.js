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
