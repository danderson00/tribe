TC.registerModel(function (pane) {
    var self = this;
    
    // Our shared observable
    this.observable = pane.data;
    
    // The pubsub object is available through the pane object.
    this.message = ko.observable();
    this.send = function() {
        pane.pubsub.publish('sample.message',
            { message: self.message() });
    };
});