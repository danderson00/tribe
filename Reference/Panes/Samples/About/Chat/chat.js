T.registerModel(function (pane) {
    // Hook up our message hub and join a channel
    //TMH.initialise(pane.pubsub);
    //TMH.joinChannel('chat', {
    //     serverEvents: ['chat.*']
    //});

    // The dispose function is called automatically
    // when the pane is removed from the DOM.
    this.dispose = function() {
        //TMH.leaveChannel('chat');
    };
});