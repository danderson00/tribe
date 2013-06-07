TC.registerModel(function (pane) {
    var self = this;
    
    Test.state.disposeCalled = false;
    Test.state.disposed = $.Deferred();
    
    this.dispose = function() {
        Test.state.disposed.resolve();
        Test.state.disposeCalled = true;
    };
});