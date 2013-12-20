TC.registerModel(function (pane) {
    var self = this;
    var channel = pane.pubsub.channel('chat').connect();

    this.message = ko.observable();
    this.messages = ko.observableArray();
    
    this.send = function() {
        channel.publish('message', self.message());
    };

    channel.subscribe('message', function(message) {
        self.messages.push(message);
    });
});