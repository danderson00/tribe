TC.registerModel(function (pane) {
    TC.toolbar.defaults.back = true;

    this.samples = function() {
        pane.navigate('samples');
    };

    this.chat = function () {
        pane.navigate('chat');
    };
});