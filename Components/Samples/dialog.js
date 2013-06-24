TC.registerModel(function(pane) {
    this.showDialog = function() {
        TC.dialog('/dialogContent', { title: 'Sample Dialog' });
    };
});