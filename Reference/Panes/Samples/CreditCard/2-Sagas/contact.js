TC.registerModel(function(pane) {
    var self = this;
    
    this.name = ko.observable();
    this.email = ko.observable();
    this.phone = ko.observable();

    this.next = function () {
        pane.pubsub.publish('CreditCard.addContact', {
            name: self.name(),
            email: self.email(),
            phone: self.phone()
        });
    };
});