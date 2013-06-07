TC.registerModel(function(pane) {
    this.paneRendered = function() {
        TC.createNode('.dynamicParent', { path: 'child' });
    };
});