TC.registerModel(function (pane) {
    var i = 0;
    
    // Dynamically insert a pane into the element
    // with its class set to "items".
    this.createPane = function() {
        TC.appendNode('.items', { path: 'item', data: ++i });
    };
});