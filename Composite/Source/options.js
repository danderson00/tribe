﻿TC.defaultOptions = function() {
    return {
        synchronous: false,
        splitScripts: false,
        handleExceptions: true,
        basePath: '',
        loadStrategy: 'adhoc',
        events: ['loadResources', 'createPubSub', 'createModel', 'initialiseModel', 'renderPane', 'renderComplete', 'active', 'dispose']
    };
};
TC.options = TC.defaultOptions();