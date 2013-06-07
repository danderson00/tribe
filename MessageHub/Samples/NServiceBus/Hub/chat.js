TC.registerModel(function (pane) {
    var self = this;
    var pubsub = pane.pubsub;
    TMH(pubsub).createSession('ChatMessage');
    
    this.message = ko.observable();
    this.messages = ko.observableArray();

    this.sendMessage = function () {
        pubsub.publish('ChatMessage', { message: self.message() });
    };

    pubsub.subscribe('ChatMessage', function(data) {
        self.messages.push(data.message);
    });
});