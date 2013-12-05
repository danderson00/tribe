TC.registerModel(function (pane) {
    var self = this;
    var pubsub = pane.pubsub;
    var data = pane.data;
    var topic = 'chat.' + data.channelId;
    
    this.message = ko.observable();
    this.messages = ko.observableArray();
    this.channel = data.channelId;

    pane.pubsub.joinChannel(data.channelId, [topic]);

    this.sendMessage = function () {
        pubsub.publish(topic, self.message());
    };

    pubsub.subscribe(topic, function (message) {
        self.messages.push(message);
    });

    this.close = function() {
        pane.remove();
    };
});