T.registerModel(function (pane) {
    var i = 0;
    
    this.createPane = function() {
        T.appendNode(pane.find('.items'),
            { path: 'item', data: ++i });
    };
});