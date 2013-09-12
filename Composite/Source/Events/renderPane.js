TC.Events.renderPane = function (pane, context) {
    var renderOperation = context.renderOperation;

    pane.startRender();
    context.templates.render(pane.element, pane.path);
    TC.Utils.tryCatch(applyBindings, null, context.options.handleExceptions, 'An error occurred applying the bindings for ' + pane.toString());

    if (pane.model.paneRendered)
        pane.model.paneRendered();

    renderOperation.complete(pane);
    return renderOperation.promise;

    function applyBindings() {
        var elements = $(pane.element).children();
        for (var i = 0, l = elements.length; i < l; i++)
            ko.applyBindings(pane.model, elements[i]);
    }
};