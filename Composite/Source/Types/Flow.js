TC.Types.Flow = function(navigationSource, definition, args) {
    var self = this;

    this.node = navigationNode();
    var pubsub = this.node.pane.pubsub;

    if (definition.constructor === Function) {
        var definitionArgs = [self].concat(Array.prototype.slice.call(arguments, 2));
        definition = Tribe.PubSub.utils.applyToConstructor(definition, definitionArgs);
    }

    var saga = new Tribe.PubSub.Saga(pubsub, definition);

    this.start = function(data) {
        saga.start(data);
        return self;
    };

    this.end = function(data) {
        saga.end(data);
        return self;
    };

    function navigationNode() {
        if (navigationSource.constructor === TC.Types.Node)
            return navigationSource.findNavigation();
        if (navigationSource.constructor === TC.Types.Pane)
            return navigationSource.node.findNavigation();
        throw new Error("navigationSource must be either TC.Types.Pane or TC.Types.Node");
    }
};

TC.Types.Flow.prototype.navigate = function (pathOrOptions, data) {
    this.node.navigate(pathOrOptions, data);
};

TC.Types.Flow.prototype.navigatesTo = function (pathOrOptions, data) {
    var node = this.node;
    return function () {
        node.navigate(pathOrOptions, data);
    };
};