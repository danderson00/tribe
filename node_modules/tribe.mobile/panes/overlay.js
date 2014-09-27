T.registerModel(function (pane) {
    var data = pane.data || {};
    var element;

    this.pane = data.pane;

    pane.node.nodeForPath = function() {
        return T.nodeFor('.TM').children[1];
    };
    
    this.renderComplete = function () {
        element = $(pane.element).find('.overlay').show();
        T.transition(element, data.transition || 'slideDown')['in']();

        T.nodeFor(element.children()).pane.remove = close;
    };

    function close() {
        T.transition(element, data.transition || 'slideDown', true).out();
    }
});

T.overlay = function (paneOptions, transition) {
    var node = T.appendNode('.TM', { path: '/Mobile/overlay', data: { pane: paneOptions }});
    return {
        node: node,
        close: function () {
            T.transition($(node.pane.element).find('.overlay'), transition || 'slideDown', true).out();
        }
    };
};

// HACK
T.dialog = function(paneOptions) {
    return T.overlay(paneOptions, 'slideLeft');
};
T.Types.Pane.prototype.dialog = T.dialog;
