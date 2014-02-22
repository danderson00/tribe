T.registerModel(function(pane) {
    var self = this;

    // Our shared observable
    this.observable = pane.data;
    
    // Listen for messages and push them onto 
    // an array as they arrive
    this.messages = ko.observableArray();
    pane.pubsub.subscribe('sample.message', function (data) {
        self.messages.push(data);
    });
});