T.registerModel(function(pane) {
    this.showDialog = function() {
        T.dialog('/dialogContent', { title: 'Sample Dialog' });
    };
});