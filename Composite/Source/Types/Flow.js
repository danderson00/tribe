(function () {
    T.Types.Flow = function (navigationSource, definition) {
        var self = this;

        this.node = navigationNode();
        this.pubsub = this.node.pane.pubsub.owner;
        this.actors = [];

        definition = createDefinition(self, definition);
        this.actor = new Tribe.PubSub.Actor(this.pubsub, definition);

        this.start = function(data) {
            self.actor.start(data);
            return self;
        };

        this.end = function(data) {
            self.actor.end(data);
            T.Utils.each(self.actors, function(actor) {
                actor.end(data);
            });
            return self;
        };

        function navigationNode() {
            if (navigationSource.constructor === T.Types.Node)
                return navigationSource.findNavigation().node;
            if (navigationSource.constructor === T.Types.Pane)
                return navigationSource.node.findNavigation().node;
            throw new Error("navigationSource must be either T.Types.Pane or T.Types.Node");
        }
    };

    T.Types.Flow.prototype.startChild = function(definition, data) {
        definition = createDefinition(this, definition);
        this.actor.startChild(definition, data);
        return this;
    };

    T.Types.Flow.prototype.navigate = function (pathOrOptions, data) {
        this.node.navigate(pathOrOptions, data);
    };
    
    // This keeps a separate collection of actors bound to this flow's lifetime
    // It would be nice to make them children of the underlying actor, but
    // then they would end any time a message was executed.
    T.Types.Flow.prototype.startActor = function (definition, data) {
        var actor = this.pubsub.startActor(definition, data);
        this.actors.push(actor);
        return actor;
    };

    // flow helpers
    T.Types.Flow.prototype.to = function (pathOrOptions, data) {
        var node = this.node;
        return function () {
            node.navigate(pathOrOptions, data);
        };
    };

    T.Types.Flow.prototype.endsAt = function (pathOrOptions, data) {
        var flow = this;
        return function () {
            flow.node.navigate(pathOrOptions, data);
            flow.end();
        };
    };

    T.Types.Flow.prototype.start = function(flow, data) {
        var thisFlow = this;
        return function() {
            thisFlow.startChild(flow, data);
        };
    };


    // This is reused by Node and Pane
    T.Types.Flow.startFlow = function (definition, data) {
        return new T.Types.Flow(this, definition).start(data);
    };
    
    function createDefinition(flow, definition) {
        if (definition.constructor === Function)
            definition = new definition(flow);
        return definition;
    }
})();