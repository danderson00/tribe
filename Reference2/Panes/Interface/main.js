TC.registerModel(function (pane) {
    var self = this;
    self.showLeftPanel = ko.observable(false);

    pane.pubsub.subscribe('ui.showLeftPanel', function(data) {
        self.showLeftPanel(data.show);
    });
});