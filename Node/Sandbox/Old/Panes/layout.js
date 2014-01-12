TC.registerModel(function (pane) {
    var self = this;

    this.saga = ko.observable();
    this.message = ko.observable();

    this.initialise = function () {
        return pane.pubsub.joinSaga('test', 'chat').done(self.saga);
    };

    this.send = function () {
        pane.pubsub.publish('chat.message', self.message());
    };
});




//var channel = pane.pubsub.channel('chat').connect();

//this.message = ko.observable();
//this.messages = ko.observableArray();

//this.send = function() {
//    channel.publish('message', self.message());
//};

//channel.subscribe('message', function(message) {
//    self.messages.push(message);
//});

