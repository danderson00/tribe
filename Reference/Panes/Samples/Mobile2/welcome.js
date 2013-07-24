TC.registerModel(function(pane) {
    this.samples = function() {
        pane.navigate('layout');
    };

    this.chat = function () {
        pane.navigate('chat');
    };
});