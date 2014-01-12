TC.registerModel(function (pane) {
    var self = this;
    var channel = pane.pubsub.channel(pane.data.channel);

    this.message = ko.observable();
    this.channel = pane.data.channel;
    this.username = pane.data.username;

    this.initialise = function () {
        return channel.joinSaga(pane.data.channel, 'chat').done(function (saga) {
            self.messages = saga.data.messages;
        });
    };

    this.send = function () {
        channel.publish('chat.message', pane.data.username + ': ' + self.message());
    };

    this.close = function () {
        pane.remove();
    };
});