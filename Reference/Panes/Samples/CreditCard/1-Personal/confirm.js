T.registerModel(function (pane) {
    var self = this;

    this.data = pane.data;
    this.json = ko.observable();

    this.submit = function () {
        // Dump the details object on screen for our viewer's pleasure.
        self.json(JSON.stringify(pane.data));
    };
});