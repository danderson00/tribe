(function () {
    var utils = Tribe.PubSub.utils;

    Tribe.PubSub.Actor = function (pubsub, definition) {
        var self = this;

        pubsub = pubsub.createLifetime();
        this.pubsub = pubsub;
        this.children = [];

        configureActor();
        this.handles = this.handles || {};

        // TODO: this is not ie<9 compatible and includes onstart / onend
        this.topics = Object.keys(this.handles);

        function configureActor() {
            if (definition)
                if (definition.constructor === Function)
                    definition(self);
                else
                    Tribe.PubSub.utils.copyProperties(definition, self, ['handles', 'endsChildrenExplicitly', 'onstart', 'onresume', 'onsuspend', 'onend']);
        }
    };

    Tribe.PubSub.Actor.prototype.start = function (startData) {
        utils.each(this.handles, this.addHandler, this);
        if (this.onstart) this.onstart(startData, this);
        return this;
    };

    Tribe.PubSub.Actor.prototype.startChild = function (child, onstartData) {
        this.children.push(new Tribe.PubSub.Actor(this.pubsub, child)
            .start(onstartData));
        return this;
    };

    Tribe.PubSub.Actor.prototype.resume = function (data, resumeData) {
        utils.each(this.handles, this.addHandler, this);
        this.data = data;
        if (this.onresume) this.onresume(resumeData, this);
        return this;
    };

    Tribe.PubSub.Actor.prototype.suspend = function (suspendData) {
        if (this.onsuspend) this.onsuspend(suspendData, this);
        this.pubsub.end();
        this.suspendChildren(suspendData);
        return this;
    };

    Tribe.PubSub.Actor.prototype.end = function (endData) {
        if (this.onend) this.onend(endData, this);
        this.pubsub.end();
        this.endChildren(endData);
        return this;
    };

    Tribe.PubSub.Actor.prototype.endChildren = function (data) {
        Tribe.PubSub.utils.each(this.children, function (child) {
            child.end(data);
        });
    };
    
    Tribe.PubSub.Actor.prototype.suspendChildren = function (data) {
        Tribe.PubSub.utils.each(this.children, function (child) {
            child.suspend(data);
        });
    };

    Tribe.PubSub.Actor.startActor = function (definition, data) {
        return new Tribe.PubSub.Actor(this, definition).start(data);
    };

    Tribe.PubSub.prototype.startActor = Tribe.PubSub.Actor.startActor;
    Tribe.PubSub.Lifetime.prototype.startActor = Tribe.PubSub.Actor.startActor;
})();
