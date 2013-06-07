TC.registerModel(function (pane) {
    var self = this;
    var pubsub = pane.pubsub;
    TMH.initialise(pubsub);
    TMH.createSession('chat.message');
    
    this.message = ko.observable();
    this.messages = ko.observableArray();

    this.sendMessage = function () {
        pubsub.publish('chat.message', self.message());
    };

    pubsub.subscribe('chat.message', function(message) {
        self.messages.push(message);
    });
});