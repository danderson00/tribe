T.registerModel(function (pane) {
    var self = this;
    this.options = pane.data.options;

    this.paneRendered = function() {
        T.transition('.modalBackground', 'fade')['in']();
        T.transition('.optionsList', 'slideDown')['in']();
    };

    this.itemClick = function (item) {
        if (item.func)
            item.func();
        self.hide();
    };

    this.hide = function() {
        $.when(
            T.transition('.optionsList', 'slideUp').out(),
            T.transition('.modalBackground', 'fade').out()
        ).done(pane.remove);
    };
});