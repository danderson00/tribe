TC.registerModel(function(pane) {
    var self = this;
    
    this.name = ko.observable();
    this.email = ko.observable();
    this.phone = ko.observable();

    this.next = function () {
        pane.pubsub.publish('CC.addContact',
            TC.Utils.cloneData(self));
    };
});