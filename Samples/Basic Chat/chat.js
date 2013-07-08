TC.registerModel(function (pane) {
    var self = this;

    this.renderComplete = function() {
        TC.toolbar.title('Chat');
        TMH.initialise(pane.pubsub, 'signalr');
        TMH.joinChannel('chat', { serverEvents: ['chatMessage'], record: true, replay: true });
    };

    this.name = ko.observable('Anonymous');
    this.messages = ko.observableArray();
    this.message = ko.observable();

    this.send = function () {
        pane.pubsub.publish('chatMessage', { message: self.message(), sender: self.name() });
        self.message('');
    };

    pane.pubsub.subscribe('chatMessage', function (data) {
        self.messages.push(data.sender + ': ' + data.message);
    });
});