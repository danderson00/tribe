window.eval("\nTribe = window.Tribe || {};\nTribe.MessageHub = Tribe.MessageHub || {};\n\nTribe.MessageHub.Client = function (pubsub, hub, publisher) {\n    var self = this;\n\n    var startConnection;\n    \n    hub.client.acceptServerMessage = function (data) {\n        var envelope = JSON.parse(data);\n        envelope.server = true;\n        envelope.sync = true;\n        pubsub.publish(envelope);\n    };\n\n    this.publishToServer = function(channelId, envelope, record) {\n        $.when(startConnection).done(function() {\n            publisher.publishToServer(channelId, envelope, record);\n        });\n    };\n\n    // want to support:\n    // (id)\n    // (id, replay)\n    // (id, { serverEvents, record, replay })\n    this.joinChannel = function (id, replayOrOptions) {\n        var lifetime;\n        var options = replayOrOptions === true ?\n            { replay: true } :\n            (replayOrOptions || { });\n\n        if(!startConnection)\n            startConnection = $.connection.hub.start();\n        \n        $.when(startConnection).done(function () {\n            hub.server.joinChannel(id);\n            if (options.replay)\n                hub.server.replayChannel(id);\n        });\n        relayMessages();\n\n        return {\n            leave: function() {\n                lifetime && lifetime.end();\n                self.leaveChannel(id);\n            }\n        };\n\n        function relayMessages() {\n            if (options.serverEvents && options.serverEvents.length > 0) {\n                lifetime = pubsub.createLifetime();\n                lifetime.subscribe(options.serverEvents, function (data, envelope) {\n                    self.publishToServer(id, envelope, options.record);\n                });\n            }\n        }\n    };\n\n    this.leaveChannel = function (id) {\n        if (startConnection)\n            $.when(startConnection).done(function() {\n                hub.server.leaveChannel(id);\n            });\n    };\n};\n//@ sourceURL=tribe://Tribe.MessageHub/client.js\n");
window.eval("\n/*!\n * Based on ASP.NET SignalR JavaScript Library v1.0.0 http://signalr.net/\n * License at https://github.com/SignalR/SignalR/blob/master/LICENSE.md\n */\n\n(function () {\n    if (typeof ($.signalR) !== \"function\")\n        window.console && window.console.log &&\n            window.console.log(\"SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before Tribe.js\");\n\n    window.TMH = {\n        initialise: function (pubsub, url) {\n            initialiseSignalR(url || '/signalr');\n            $.extend(TMH, new Tribe.MessageHub.Client(\n                pubsub,\n                $.connection.hubImplementation,\n                new Tribe.MessageHub.Publisher($.connection.hubImplementation)));\n        },\n        publishToServer: notInitialised,\n        joinChannel: notInitialised,\n        leaveChannel: notInitialised\n    };\n    \n    function notInitialised() {\n        throw \"Tribe.MessageHub must be initialised before use by calling TMH.initialise(pubsub, url)\";\n    }\n\n    function initialiseSignalR(url) {\n        var signalR = $.signalR;\n\n        function makeProxyCallback(hub, callback) {\n            return function () {\n                // Call the client hub method\n                callback.apply(hub, $.makeArray(arguments));\n            };\n        }\n\n        function registerHubProxies(instance, shouldSubscribe) {\n            var key, hub, memberKey, memberValue, subscriptionMethod;\n\n            for (key in instance) {\n                if (instance.hasOwnProperty(key)) {\n                    hub = instance[key];\n\n                    if (!(hub.hubName)) {\n                        // Not a client hub\n                        continue;\n                    }\n\n                    if (shouldSubscribe) {\n                        // We want to subscribe to the hub events\n                        subscriptionMethod = hub.on;\n                    } else {\n                        // We want to unsubscribe from the hub events\n                        subscriptionMethod = hub.off;\n                    }\n\n                    // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe\n                    for (memberKey in hub.client) {\n                        if (hub.client.hasOwnProperty(memberKey)) {\n                            memberValue = hub.client[memberKey];\n\n                            if (!$.isFunction(memberValue)) {\n                                // Not a client hub function\n                                continue;\n                            }\n\n                            subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));\n                        }\n                    }\n                }\n            }\n        }\n\n        $.hubConnection.prototype.createHubProxies = function () {\n            var proxies = {};\n            this.starting(function () {\n                // Register the hub proxies as subscribed\n                // (instance, shouldSubscribe)\n                registerHubProxies(proxies, true);\n\n                this._registerSubscribedHubs();\n            }).disconnected(function () {\n                // Unsubscribe all hub proxies when we \"disconnect\".  This is to ensure that we do not re-add functional call backs.\n                // (instance, shouldSubscribe)\n                registerHubProxies(proxies, false);\n            });\n\n            proxies.hubImplementation = this.createHubProxy('hubImplementation');\n            proxies.hubImplementation.client = {};\n            proxies.hubImplementation.server = {\n                publish: function (channelId, message, record) {\n                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge([\"Publish\"], $.makeArray(arguments)));\n                },\n                joinChannel: function (channelId) {\n                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge([\"JoinChannel\"], $.makeArray(arguments)));\n                },\n                replayChannel: function (channelId) {\n                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge([\"ReplayChannel\"], $.makeArray(arguments)));\n                },\n                leaveChannel: function (channelId) {\n                    return proxies.hubImplementation.invoke.apply(proxies.hubImplementation, $.merge([\"LeaveChannel\"], $.makeArray(arguments)));\n                }\n            };\n\n            return proxies;\n        };\n\n        signalR.hub = $.hubConnection(url, { useDefaultPath: false });\n        $.extend(signalR, signalR.hub.createHubProxies());\n    }\n})();\n\n//@ sourceURL=tribe://Tribe.MessageHub/initialise.js\n");
window.eval("\nTribe = window.Tribe || {};\nTribe.MessageHub = Tribe.MessageHub || {};\n\nTribe.MessageHub.Publisher = function (hub) {\n    var self = this;\n    var queue = [];\n\n    this.publishToServer = function(channelId, envelope, record) {\n        if (!envelope.server) {\n            if (connected())\n                hub.server.publish(channelId, JSON.stringify(envelope), record === true);\n            else\n                queueMessage(channelId, envelope);\n        }\n    };\n    \n    function queueMessage(channelId, envelope) {\n        queue.push(function() {\n            self.publishToServer(channelId, envelope);\n        });\n    }\n    \n    hub.connection.stateChanged(function (change) {\n        if (connected(change.newState))\n            flushQueue();\n    });\n\n    function flushQueue() {\n        if (queue.length > 0) {\n            var oldQueue = queue;\n            queue = [];\n            $.each(oldQueue, function(index, queueItem) {\n                queueItem();\n            });\n        }\n    }\n\n    function connected(state) {\n        return state ?\n            state === $.signalR.connectionState.connected :\n            hub.connection.state === $.signalR.connectionState.connected;\n    }\n};\n//@ sourceURL=tribe://Tribe.MessageHub/Publisher.js\n");
window.eval("\nTribe.PubSub.prototype.joinChannel = function(channelId, replayOrOptions) {\n    TMH.joinChannel(channelId, replayOrOptions);\n};\n\nTribe.PubSub.Lifetime.prototype.joinChannel = function (channelId, replayOrOptions) {\n    var endLifetime = this.end;\n    var channel = TMH.joinChannel(channelId, replayOrOptions);\n\n    this.end = function() {\n        channel.leave();\n        endLifetime();\n    };\n};\n//@ sourceURL=tribe://Tribe.MessageHub/PubSub.extensions.js\n");
