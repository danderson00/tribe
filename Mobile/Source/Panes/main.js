TC.registerModel(function (pane) {
    TC.transition.mode = "normal";
    
    this.pane = (pane.data && pane.data.pane) || 'blank';

    this.renderComplete = function() {
        setPadding(TC.toolbar.visible());
        TC.toolbar.visible.subscribe(setPadding);
    };

    function setPadding(visible) {
        if (visible) {
            var height = $('.main .toolbar').outerHeight();
            $('<style id="__tribe_toolbar">.main .screenContainer > * { margin-top: ' + height + 'px; padding-bottom: ' + height + 'px }</style>').appendTo('head');
        } else
            $('#__tribe_toolbar').remove();
    };
});