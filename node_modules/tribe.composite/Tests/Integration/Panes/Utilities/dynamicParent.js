T.registerModel(function(pane) {
    this.paneRendered = function() {
        T.createNode('.dynamicParent', { path: 'child' });
    };
});