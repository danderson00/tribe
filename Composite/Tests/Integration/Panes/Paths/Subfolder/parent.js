TC.registerModel(function(pane) {
    this.renderComplete = function() {
        TC.createNode('.parent', { path: '/Paths/common', data: { pane: 'child' } });
    };
});