TC.registerModel(function(pane) {
    var self = this;
    
    this.limit = ko.observable();
    this.cards = ko.observable();

    this.next = function() {
        pane.pubsub.publish('CreditCard.addAccountDetails', {
            limit: self.limit(),
            cards: self.cards()
        });
    };
});