Tribe.PubSub.Saga = function (pubsub, definition) {
    var self = this;
    var utils = Tribe.PubSub.utils;

    pubsub = pubsub.createLifetime();
    this.pubsub = pubsub;
    this.children = [];

    configureSaga();
    var handlers = this.handles || {};

    // this is not ie<9 compatible and includes onstart / onend
    this.topics = Object.keys(handlers);

    this.start = function (startData) {
        utils.each(handlers, self.addHandler, self);
        if (handlers.onstart) handlers.onstart(startData, self);
        return self;
    };

    this.startChild = function (child, onstartData) {
        self.children.push(new Tribe.PubSub.Saga(pubsub, child)
            .start(onstartData));
        return self;
    };

    this.join = function (data, onjoinData) {
        utils.each(handlers, self.addHandler, self);
        self.data = data;
        if (handlers.onjoin) handlers.onjoin(onjoinData, self);
        return self;
    };

    this.end = function (onendData) {
        if (handlers.onend) handlers.onend(onendData, self);
        pubsub.end();
        self.endChildren(onendData);
        return self;
    };

    this.endChildren = function(data) {
        Tribe.PubSub.utils.each(self.children, function(child) {
             child.end(data);
        });
    }
    
    function configureSaga() {
        if (definition)
            if (definition.constructor === Function)
                definition(self);
            else
                Tribe.PubSub.utils.copyProperties(definition, self, ['handles', 'endsChildrenExplicitly']);
    }
};

Tribe.PubSub.Saga.startSaga = function (definition, data) {
    return new Tribe.PubSub.Saga(this, definition).start(data);
};

Tribe.PubSub.prototype.startSaga = Tribe.PubSub.Saga.startSaga;
Tribe.PubSub.Lifetime.prototype.startSaga = Tribe.PubSub.Saga.startSaga;