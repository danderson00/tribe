T.registerModel(function (pane) {
    this.message = 'test message';
    
    this.paneRendered = function() {
        if (Test.state.paneRendered) Test.state.paneRendered();
    };

    this.renderComplete = function() {
        if (Test.state.renderComplete) Test.state.renderComplete();
    };
});