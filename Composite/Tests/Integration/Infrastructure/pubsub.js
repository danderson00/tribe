Test.Integration.pubsubAsMock = function() {
    Test.Integration.pubsub = function() {
        var pubsub = { end: sinon.spy(), createLifetime: function () { return pubsub; } };
        sinon.spy(pubsub, 'createLifetime');
        return pubsub;
    };
};

Test.Integration.pubsubAsTribe = function () {
    Test.Integration.pubsub = function () {
        return new Tribe.PubSub({ sync: true });
    };
};

Test.Integration.pubsubAsMock();