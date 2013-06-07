TC.registerModel(function (pane) {
    var channel = TMH.joinChannel('chat', { serverEvents: ['chatMessage', 'memberJoined', 'memberLeft'], record: true, replay: true });

    this.member = pane.data.member;

    this.leave = function() {
        pane.pubsub.publish('memberLeft', pane.data.member);
        pane.navigate('join');
    };

    this.renderComplete = function() {
        pane.pubsub.publish('memberJoined', pane.data.member);
    };

    this.dispose = function() {
        channel.leave();
    };
});