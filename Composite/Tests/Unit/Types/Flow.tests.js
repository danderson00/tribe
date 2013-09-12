(function () {
    var spy;
    var definition;
    var pane;
    var node;
    
    module('Unit.Types.Flow', {
        setup: function () {
            spy = sinon.spy();
            pane = new TC.Types.Pane({ pubsub: new Tribe.PubSub({ sync: true }) });
            node = new TC.Types.Node(null, pane);
            node.findNavigation = function() { return { navigate: spy }; };
            definition = {};
        }
    });

})();
