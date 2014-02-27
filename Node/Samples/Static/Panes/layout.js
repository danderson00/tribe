T.registerModel(function (pane) {
    var channel = pane.pubsub.channel('test').connect();

    this.trigger = function () {
        channel.publish('trigger');
    };

    channel.subscribe('response', function () {
        $('body').append('<div>Response received</div>');
    });
});