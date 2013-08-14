TC.registerModel(function(pane) {
    var self = this;

    TMH.initialise(pane.pubsub);
    TMH.joinChannel('chat', { serverEvents: ['chat.*'] });

    this.message = ko.observable();
    this.messages = ko.observableArray();

    this.send = function () {
        pane.pubsub.publish('chat.message', self.message());
    };

    pane.pubsub.subscribe('chat.message', function (message) {
        self.messages.push(message);
    });
});