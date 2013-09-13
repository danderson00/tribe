TC.registerModel(function(pane) {
    var self = this;
    
    this.limit = ko.observable();
    this.cards = ko.observable();

    this.next = function() {
        pane.pubsub.publish('CC.addAccountDetails', 
            TC.Utils.cloneData(self));
    };
});