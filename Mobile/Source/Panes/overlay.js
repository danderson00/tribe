TC.registerModel(function (pane) {
    var data = pane.data || {};
    var element;

    pane.node.skipPath = true;
    this.pane = data.pane;

    this.renderComplete = function () {
        element = $(pane.element).find('.overlay').show();
        TC.transition(element, data.transition || 'slideDown').in();

        TC.Utils.nodeFor(element.children()).pane.remove = close;
    };

    function close() {
        TC.transition(element, data.transition || 'slideDown', true).out();
    }
});

TC.overlay = function (paneOptions, transition) {
    var node = TC.appendNode('.TM', { path: '/Mobile/overlay', data: { pane: paneOptions, transition: transition } });
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
} 
TC.Types.Pane.prototype.dialog = TC.dialog;