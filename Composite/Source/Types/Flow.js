(function () {
    TC.Types.Flow = function (navigationSource, definition, args) {
        var self = this;

        this.node = navigationNode();
        this.pubsub = this.node.pane.pubsub.owner;
        this.sagas = [];

        definition = createDefinition(self, definition, Array.prototype.slice.call(arguments, 2));
        this.saga = new Tribe.PubSub.Saga(this.pubsub, definition);

        this.start = function(data) {
            self.saga.start(data);
            return self;
        };

        this.end = function(data) {
            self.saga.end(data);
            TC.Utils.each(self.sagas, function(saga) {
                saga.end(data);
            });
            return self;
        };

        function navigationNode() {
            if (navigationSource.constructor === TC.Types.Node)
                return navigationSource.findNavigation().node;
            if (navigationSource.constructor === TC.Types.Pane)
                return navigationSource.node.findNavigation().node;
            throw new Error("navigationSource must be either TC.Types.Pane or TC.Types.Node");
        }
    };

    TC.Types.Flow.prototype.startChild = function(definition, args) {
        definition = createDefinition(this, definition, Array.prototype.slice.call(arguments, 1));
        this.saga.startChild(definition);
    };

    TC.Types.Flow.prototype.navigate = function (pathOrOptions, data) {
        this.node.navigate(pathOrOptions, data);
    };

    TC.Types.Flow.prototype.to = function (pathOrOptions, data) {
        var node = this.node;
        return function () {
            node.navigate(pathOrOptions, data);
        };
    };

    TC.Types.Flow.prototype.endsAt = function (pathOrOptions, data) {
        var flow = this;
        return function () {
            flow.node.navigate(pathOrOptions, data);
            flow.end();
        };
    };

    TC.Types.Flow.prototype.start = function(flow, args) {
        var thisFlow = this;
        var childArguments = arguments;
        return function() {
            thisFlow.startChild.apply(thisFlow, childArguments);
        };
    };

    // This keeps a separate collection of sagas bound to this flow's lifetime
    // It would be nice to make them children of the underlying saga, but
    // then they would end any time a message was executed.
    TC.Types.Flow.prototype.startSaga = function (definition, args) {
        var saga = this.pubsub.startSaga.apply(this.pubsub, arguments);
        this.sagas.push(saga);
        return saga;
    };

    // This is reused by Node and Pane
    TC.Types.Flow.startFlow = function (definition, args) {
        var constructorArgs = [this, definition].concat(Array.prototype.slice.call(arguments, 1));
        var flow = Tribe.PubSub.utils.applyToConstructor(TC.Types.Flow, constructorArgs);
        return flow.start();
    };
    
    function createDefinition(flow, definition, argsToApply) {
        if (definition.constructor === Function) {
            var definitionArgs = [flow].concat(argsToApply);
            definition = Tribe.PubSub.utils.applyToConstructor(definition, definitionArgs);
        }
        return definition;
    }
})();