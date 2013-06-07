TC.registerModel(function(pane) {
    pane.pubsub.subscribe('test', function(data) {
        $('.subscriber').text(data);
    });
});