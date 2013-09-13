TC.registerModel(function(pane) {
    this.start = function () {
        // Navigate to the first pane in the flow,
        // passing in an object that will capture
        // the application details.
        pane.navigate('account', {
            type: 'personal'
        });
    };
});