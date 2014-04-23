T.registerModel(function (pane) {
    this.run = function () {
        pane.pubsub.publish({ topic: 'test.run', channelId: '__test' });
    };

    this.debug = function () {
        window.open('http://localhost:8080/debug?port=5859');
    };
});