Tribe.PubSub.Saga = function (pubsub, definition, args) {
    var self = this;

    pubsub = pubsub.createLifetime();
    this.pubsub = pubsub;
    this.children = [];

    if (definition.constructor === Function) {
        var definitionArgs = [self].concat(Array.prototype.slice.call(arguments, 2));
        definition = Tribe.PubSub.utils.applyToConstructor(definition, definitionArgs);
    }
    var handlers = definition.handles || {};

    this.start = function (data) {
        Tribe.PubSub.utils.each(handlers, attachHandler);
        if (handlers.onstart) handlers.onstart(data, self);
        return self;
    };

    this.startChild = function (child, data) {
        self.children.push(new Tribe.PubSub.Saga(pubsub, child).start(data));
    };

    this.end = function (data) {
        if (handlers.onend) handlers.onend(data, self);
        pubsub.end();
        endChildren(data);
    };

    function attachHandler(handler, topic) {
        if (topic !== 'onstart' && topic !== 'onend')
            if (!handler)
                pubsub.subscribe(topic, endHandler());
            else if (handler.constructor === Function)
                pubsub.subscribe(topic, messageHandlerFor(handler));
            else
                pubsub.subscribe(topic, childHandlerFor(handler));
    }

    function messageHandlerFor(handler) {
        return function (messageData, envelope) {
            if (!definition.endsChildrenExplicitly)
                endChildren(messageData);
            handler(messageData, envelope, self);
        };
    }

    function childHandlerFor(childHandlers) {
        return function (messageData, envelope) {
            self.startChild({ handles: childHandlers }, messageData);
        };
    }

    function endHandler() {
        return function (messageData) {
            self.end(messageData);
        };
    }

    function endChildren(data) {
        Tribe.PubSub.utils.each(self.children, function(child) {
             child.end(data);
        });
    }    
};