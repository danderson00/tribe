(function(T) {
//

// Handlers/test.run.js


T.scriptEnvironment = { resourcePath: '/test.run' };

var runner = require('tribe/test/mocha'),
    options = require('tribe/options');

runner.loadDirectory(options.modulePath + '/tests/server');
T.registerHandler('test.run', function (handler, envelope) {
    runner.run();
});

       
})({
    registerSaga: function(constructor) {
        require('tribe/handlers/sagas').register(this.scriptEnvironment.resourcePath, constructor);
    },
    registerHandler: function(messageFilter, handler) {
        require('tribe/handlers/statics').register(messageFilter, handler);
    }
})