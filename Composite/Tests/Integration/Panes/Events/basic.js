TC.registerModel(function (pane) {
    var self = this;
    
    Test.state.model = this;
    Test.state.pane = pane;

    this.message = '';
    this.paneRenderedCalled = false;
    this.renderCompleteCalled = false;
    this.disposeCalled = false;
    
    this.initialise = function() {
        self.message = 'test message';
    };

    this.paneRendered = function() {
        self.paneRenderedCalled = true;
    };

    this.renderComplete = function() {
        self.renderCompleteCalled = true;
    };

    this.dispose = function() {
        self.disposeCalled = true;
    };
});