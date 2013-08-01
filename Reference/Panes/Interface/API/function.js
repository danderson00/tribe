TC.registerModel(function(pane) {
    this.f = pane.data;

    this.argumentNames = TC.Utils.pluck(pane.data.arguments, 'name').join(', ');

    this.paneRendered = function() {
        $(pane.element).find('pre').each(function() {
            $(this).html(PR.prettyPrintOne($(this).text()));
        });
    };
});