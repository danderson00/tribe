TC.registerModel(function (pane) {
    this.initialise = function() {
        return Test.state.deferred = $.Deferred();
    };
});