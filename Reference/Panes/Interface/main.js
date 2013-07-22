TC.registerModel(function (pane) {
    var self = this;
    self.showLeftPanel = ko.observable(false);

    Topic.createHelpers(pane.pubsub);

    pane.pubsub.subscribe('ui.showLeftPanel', function (data) {
        self.showLeftPanel(data.show);
    });
});