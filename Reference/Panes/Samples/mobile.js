TC.registerModel(function(pane) {
    TMH.initialise(pane.pubsub, 'signalr');
    TMH.joinChannel('chat', { serverEvents: ['chat.*'] });
});