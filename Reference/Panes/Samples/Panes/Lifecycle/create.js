TC.registerModel(function (pane) {
    var i = 0;
    
    this.createPane = function() {
        TC.appendNode(pane.find('.items'),
            { path: 'item', data: ++i });
    };
});