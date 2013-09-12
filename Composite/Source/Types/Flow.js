TC.Types.Flow = function (navigationSource, definitionConstructor) {
    var node = navigationNode();
    var definition = definitionConstructor(this);
    var saga = new TC.Types.Saga(definition);

    this.start = function(data) {
        saga.start(data);
    };

    this.end = function(data) {
        saga.end(data);
    };

    this.navigates = function(pathOrOptions, data) {
        return function() {
            node.navigate(pathOrOptions, data);
        };
    };
    
    function navigationNode() {
        if (navigationSource.constructor === TC.Types.Node)
            return navigationSource.findNavigation();
        if (navigationSource.constructor === TC.Types.Pane)
            return navigationSource.node.findNavigation();
    }
}