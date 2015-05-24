T.defaultOptions = function() {
    return {
        synchronous: false,
        handleExceptions: true,
        basePath: '',
        loadStrategy: 'adhoc',
        events: ['loadResources', 'createPubSub', 'createModel', 'initialiseModel', 'renderPane', 'renderComplete', 'active', 'dispose']
    };
};
T.options = T.defaultOptions();
