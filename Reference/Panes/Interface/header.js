TC.registerModel(function (pane) {
    window.addEventListener('navigating', navigating);
    function navigating(e) {
        if (Navigation.isHome(e.data.options.data))
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
            TC.transition('.header .logo', 'fade').in();
    }

    function hide() {
        if ($('.header .logo').is(':visible'))
            TC.transition('.header .logo', 'fade').out(false);
    }

    this.feedback = function () {
        TC.transition(
            TC.appendNode('body', { path: '/Interface/feedback' }),
            'fade').in();
    };

    this.dispose = function () {
        window.removeEventListener('navigating', navigating);
    };
});