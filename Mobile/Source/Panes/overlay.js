TC.registerModel(function (pane) {
    var data = pane.data || {};
    var element;

    this.pane = data.pane;

    pane.node.nodeForPath = function() {
        return TC.nodeFor('.TM').children[1];
    };
    
    this.renderComplete = function () {
        element = $(pane.element).find('.overlay').show();
        TC.transition(element, data.transition || 'slideDown').in();

        TC.nodeFor(element.children()).pane.remove = close;
    };

    function close() {
        TC.transition(element, data.transition || 'slideDown', true).out();
    }
});

TC.overlay = function (paneOptions, transition) {
    var node = TC.appendNode('.TM', { path: '/Mobile/overlay', data: { pane: paneOptions }});
    return {
        node: node,
        close: function () {
            TC.transition($(node.pane.element).find('.overlay'), transition || 'slideDown', true).out();
        }
    };
};

// HACK
TC.dialog = function(paneOptions) {
    return TC.overlay(paneOptions, 'slideLeft');
};
TC.Types.Pane.prototype.dialog = TC.dialog;