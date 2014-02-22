(function () {
    var staticState;

    T.context = function (source) {
        staticState = staticState || {
            models: new T.Types.Resources(),
            sagas: new T.Types.Resources(),
            loader: new T.Types.Loader(),
            options: T.options,
            templates: new T.Types.Templates(),
            loadedPanes: {}
        };
        var perContextState = {
            renderOperation: new T.Types.Operation(),
            pubsub: T.options.pubsub
        };
        return $.extend({}, staticState, perContextState, source);
    };
})();
