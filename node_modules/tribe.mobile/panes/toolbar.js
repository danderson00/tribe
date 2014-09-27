T.toolbar = {
    title: ko.observable(),
    back: ko.observable(false),
    options: ko.observableArray([]),
    visible: ko.observable(true),
    defaults: {
        options: [],
        visible: true
    }
};
T.registerModel(function (pane) {
    this.back = function () {
        var back = ko.utils.unwrapObservable(pane.data.back || T.toolbar.back);
        if (back === true)
            pane.node.navigateBack();
        else if (back.constructor === Function)
            back();
    };

    this.showOptions = function() {
        T.appendNode(pane.element, { path: 'options', data: { options: pane.data.options || T.toolbar.options() } });
    };

    function renderComplete() {
        var defaults = T.toolbar.defaults;
        T.toolbar.back(defaults.back && !pane.node.findNavigation().isAtStart());
    }
    
    function navigating() {
        var defaults = T.toolbar.defaults;
        T.toolbar.title(defaults.title);
        T.toolbar.options(defaults.options);
        T.toolbar.visible(defaults.visible);
    }

    T.Utils.handleDocumentEvent('renderComplete', renderComplete);
    T.Utils.handleDocumentEvent('navigating', navigating);
    this.dispose = function () {
        T.Utils.detachDocumentEvent('renderComplete', renderComplete);
        T.Utils.detachDocumentEvent('navigating', navigating);
    };
});