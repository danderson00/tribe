TC.registerModel(function (pane) {
    var self = this;
    
    this.messages = ko.observableArray();
    this.message = ko.observable();

    this.send = function () {
        pane.pubsub.publish('chatMessage', { message: self.message(), member: pane.data.member });
        self.message('');
    };

    pane.pubsub.subscribe('chatMessage', function (data) {
        self.messages.push(data.member.name + ': ' + data.message);
    });
});