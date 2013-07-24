TC.toolbar = {
    title: ko.observable(),
    back: ko.observable(),
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

    document.addEventListener('navigating', function() {
        var defaults = TC.toolbar.defaults;
        TC.toolbar.title(defaults.title);
        TC.toolbar.options(defaults.options);
        TC.toolbar.back(defaults.back);
        TC.toolbar.visible(defaults.visible);
    });
});