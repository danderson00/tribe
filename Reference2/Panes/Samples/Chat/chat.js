TC.registerModel(function(pane) {
    var self = this;

    this.name = ko.observable('Anonymous');
    this.message = ko.observable();
    this.messages = ko.observableArray();

    this.send = function() {
        pane.pubsub.publish('chat.message', {
            name: self.name(),
            message: self.message()
        });
    };

    pane.pubsub.subscribe('chat.message', function(message) {
        self.messages.push(message);
    });
});