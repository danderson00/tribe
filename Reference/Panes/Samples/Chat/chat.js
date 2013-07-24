TC.registerModel(function (pane) {
    TMH.initialise(pane.pubsub, 'signalr');
    TMH.joinChannel('chat', {
         serverEvents: ['chat.*']
    });
    
    // Any message topics starting with "chat."
    // are now seamlessly broadcast to any other
    // client that has also joined the channel.
});