T.registerModel(function (pane) {
    var self = this;

    this.data = pane.data;
    this.json = ko.observable();

    this.submit = function() {
        self.json(JSON.stringify(pane.data));
    };

    this.restart = function() {
        pane.startFlow(CreditCardFlow);
    };
});