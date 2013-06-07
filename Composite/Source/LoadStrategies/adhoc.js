TC.LoadStrategies.adhoc = function (pane, context) {
    if (context.loadedPanes[pane.path] !== undefined)
        return context.loadedPanes[pane.path];

    var path = TC.Path(context.options.basePath).combine(TC.Path(pane.path).makeRelative());

    if (context.templates.loaded(pane.path) || context.models[pane.path])
        return null;

    var deferred = $.complete([
        context.loader.get(path.setExtension('js').toString(), pane.path, context),
        context.loader.get(path.setExtension('htm').toString(), pane.path, context),
        context.loader.get(path.setExtension('css').toString(), pane.path, context)
    ]);

    context.loadedPanes[pane.path] = deferred;

    $.when(deferred)
        .fail(function() {
            TC.logger.error("Unable to load resources for '" + pane.path + "'.");
        })
        .always(function () {
            context.loadedPanes[pane.path] = null;
        });

    return deferred;
};