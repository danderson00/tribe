TC.registerModel(function (pane) {
    this.renderComplete = function() {
        Test.state.parentRenderCompleteCalled = true;
    };
});