TC.registerModel(function (pane) {
    var self = this;

    this.data = pane.data;
    this.ccJson = ko.observable();

    this.submit = function() {
        self.ccJson(JSON.stringify(pane.data));
    };

    this.restart = function() {
        pane.startFlow(CreditCardFlow);
    };
});