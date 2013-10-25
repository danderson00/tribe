TC.toolbar = {
    title: ko.observable(),
    back: ko.observable(false),
    options: ko.observableArray([]),
    visible: ko.observable(true),
    defaults: {
        options: [],
        visible: true
    }
};
TC.registerModel(function (pane) {
    this.back = function () {
        var back = ko.utils.unwrapObservable(pane.data.back || TC.toolbar.back);
        if (back === true)
            pane.node.navigateBack();
        else if (back.constructor === Function)
            back();
    };

    this.showOptions = function() {
        TC.appendNode(pane.element, { path: 'options', data: { options: pane.data.options || TC.toolbar.options() } });
    };

    function renderComplete() {
        var defaults = TC.toolbar.defaults;
        TC.toolbar.back(defaults.back && !pane.node.findNavigation().isAtStart());
    }
    
    function navigating() {
        var defaults = TC.toolbar.defaults;
        TC.toolbar.title(defaults.title);
        TC.toolbar.options(defaults.options);
        TC.toolbar.visible(defaults.visible);
    }

    TC.Utils.handleDocumentEvent('renderComplete', renderComplete);
    TC.Utils.handleDocumentEvent('navigating', navigating);
    this.dispose = function () {
        TC.Utils.detachDocumentEvent('renderComplete', renderComplete);
        TC.Utils.detachDocumentEvent('navigating', navigating);
    };
});