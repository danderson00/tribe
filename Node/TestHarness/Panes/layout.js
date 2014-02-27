T.registerModel(function (pane) {
    var self = this,
        channel = pane.pubsub.channel('test').connect();

    this.tests = ko.observableArray();

    this.run = function () {
        self.tests.splice(0, self.tests.length);
        channel.publish('test.run');
    };

    channel.subscribe('test.done', function (test) {
        self.tests.push(test);
    });
});