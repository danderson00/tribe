(function () {
    var staticState;

    TC.context = function (source) {
        staticState = staticState || {
            models: new TC.Types.Models(),
            loader: new TC.Types.Loader(),
            options: TC.options,
            templates: new TC.Types.Templates(),
            loadedPanes: {},
            pubsub: Tribe.PubSub && new Tribe.PubSub({ sync: TC.options.synchronous, handleExceptions: TC.options.handleExceptions })
        };
        var perContextState = {
            renderOperation: new TC.Types.Operation()
        };
        return $.extend({}, staticState, perContextState, source);
    };
})();
