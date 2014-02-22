T.registerModel(function (pane) {
    Test.state.pane = pane;

    this.renderComplete = function() {
        if (Test.state.renderComplete) Test.state.renderComplete();
    };
});