T.registerModel(function (pane) {
    T.toolbar.defaults.back = true;

    this.samples = function() {
        pane.navigate('samples');
    };

    this.chat = function () {
        pane.navigate('chat');
    };
});