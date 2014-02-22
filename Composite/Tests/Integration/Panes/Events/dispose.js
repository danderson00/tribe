T.registerModel(function (pane) {
    Test.state.disposeCallCount = 0;
    Test.state.disposed = $.Deferred();
    
    this.dispose = function() {
        Test.state.disposed.resolve();
        Test.state.disposeCallCount++;
    };
});