T.registerModel(function(pane) {
    pane.pubsub.subscribe('testMessage', function(message) {
        $('body').append('<div>' + JSON.stringify(message) + '</div>');
    });
});