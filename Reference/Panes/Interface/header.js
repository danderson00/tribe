T.registerModel(function (pane) {
    T.Utils.handleDocumentEvent('navigating', navigating);
    function navigating(e) {
        if (Navigation.isHome(e.eventData.options.data))
            hide();
        else
            show();
    }

    this.renderComplete = function() {
        if (!Navigation.isHome(pane.node.findNavigation().node.pane.data))
            show();
    };

    function show() {
        if (!$('.header .logo').is(':visible'))
            T.transition('.header .logo', 'fade')['in']();
    }

    function hide() {
        if ($('.header .logo').is(':visible'))
            T.transition('.header .logo', 'fade').out(false);
    }

    this.feedback = function () {
        T.transition(
            T.appendNode('body', { path: '/Interface/feedback' }),
            'fade')['in']();
    };

    this.dispose = function () {
        window.removeEventListener('navigating', navigating);
    };
});