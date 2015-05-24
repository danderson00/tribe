T.context = function (state) {
    Test.Integration.context = $.extend({
        models: new T.Types.Resources(),
        actors: new T.Types.Resources(),
        loader: new T.Types.Loader(),
        options: T.options,
        templates: new T.Types.Templates(),
        loadedPanes: {},
        renderOperation: new T.Types.Operation(),
        pubsub: Test.Integration.pubsub()
    }, state);
    return Test.Integration.context;
};