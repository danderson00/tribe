TC.registerModel(function (pane) {
    this.data = pane.data;

    // The initialise function is called before the pane
    // is rendered. If you return a jQuery deferred object,
    // Tribe will wait for it to resolve before continuing.
    
    this.initialise = function() {
        var promise = $.Deferred();
        setTimeout(promise.resolve, 500);
        return promise;
    };
});