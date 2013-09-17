TC.registerModel(function(pane) {
    this.start = function () {
        // panes expose a simple function for starting flows
        pane.startFlow(PersonalFlow);
    };
});