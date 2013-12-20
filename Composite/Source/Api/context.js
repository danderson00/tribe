(function () {
    var staticState;

    TC.context = function (source) {
        staticState = staticState || {
            models: new TC.Types.Models(),
            loader: new TC.Types.Loader(),
            options: TC.options,
            templates: new TC.Types.Templates(),
            loadedPanes: {}
        };
        var perContextState = {
            renderOperation: new TC.Types.Operation(),
            pubsub: TC.options.pubsub
        };
        return $.extend({}, staticState, perContextState, source);
    };
})();
