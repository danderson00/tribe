TC.registerModel(function(pane) {
    var self = this;
    
    this.name = ko.observable();
    this.abn = ko.observable();

    this.next = function() {
        pane.pubsub.publish('CC.addBusinessDetails', 
            TC.Utils.cloneData(self));
    };
});