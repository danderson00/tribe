T.registerModel(function(pane) {
    this.renderComplete = function() {
        T.createNode('.parent', { path: '/Paths/common', data: { pane: 'child' } });
    };
});