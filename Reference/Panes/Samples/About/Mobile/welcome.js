TC.registerModel(function (pane) {
    TC.toolbar.defaults.back = true;

    this.samples = function() {
        pane.navigate('layout');
    };

    this.chat = function () {
        pane.navigate('chat');
    };
});