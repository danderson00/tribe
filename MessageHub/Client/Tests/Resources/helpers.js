function mockSignalR() {
    $.connection = {
        hubImplementation: {
            client: {},
            server: {
                publish: sinon.spy(),
                joinChannel: sinon.spy(),
                replayChannel: sinon.spy()
            },
            connection: {
                state: 1,
                stateChanged: sinon.spy()
            }
        },
        hub: {
            start: function() {
                return {
                    done: function(callback) {
                        callback();
                    }
                };
            }
        }
    };
    $.signalR = {
        connectionState: {
            connected: 1
        }
    };
    $.hubConnection = function (){ return { createHubProxies: function() { } }};
};

function mockPubSub() {
    return {
        publish: sinon.spy(),
        publishSync: sinon.spy(),
        subscribe: sinon.spy(),
        createLifetime: function () { return this; }
    };
}

function mockPublisher() {
    return { publishToServer: sinon.spy() };
}

Tribe = window.Tribe || {};
Tribe.PubSub = function() { };
Tribe.PubSub.Lifetime = function() { };