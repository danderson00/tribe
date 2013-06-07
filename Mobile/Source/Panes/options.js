TC.registerModel(function (pane) {
    var self = this;
    this.options = pane.data.options;

    this.paneRendered = function() {
        TC.transition('.modalBackground', 'fade').in();
        TC.transition('.optionsList', 'slideDown').in();
    };

    this.itemClick = function (item) {
        if (item.func)
            item.func();
        self.hide();
    };

    this.hide = function() {
        $.when(
            TC.transition('.optionsList', 'slideUp').out(),
            TC.transition('.modalBackground', 'fade').out()
        ).done(pane.remove);
    };
});