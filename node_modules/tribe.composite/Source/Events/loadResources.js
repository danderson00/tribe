T.Events.loadResources = function (pane, context) {
    var strategy = T.LoadStrategies[context.options.loadStrategy];
    
    if (!strategy)
        throw "Unknown resource load strategy";

    return strategy(pane, context);
};