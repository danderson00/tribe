T.registerModel(function (pane) {
    //T.transition.mode = "normal";
    
    this.pane = (pane.data && pane.data.pane) || 'blank';

    this.renderComplete = function() {
        setPadding(T.toolbar.visible());
        T.toolbar.visible.subscribe(setPadding);
        
        // this is a bit of a hack to make navigation from the toolbar occur against the child navigation pane in embedded scenarios
        pane.node.navigation = pane.node.children[1].navigation;
    };

    function setPadding(visible) {
        if (visible) {
            var height = $('.TM .toolbar').outerHeight();
            $('<style id="__tribe_toolbar">.TM .screenContainer > * { padding-top: ' + height + 'px; }</style>').appendTo('head');
        } else
            $('#__tribe_toolbar').remove();
    };
});