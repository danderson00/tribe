(function(T) {
//

// Handlers/test.js


T.scriptEnvironment = { resourcePath: '/test' };

T.registerHandler('trigger', function (handler) {
    handler.publish('response');
});

       
})({
    registerSaga: function(constructor) {
        require('tribe/handlers/sagas').register(this.scriptEnvironment.resourcePath, constructor);
    },
    registerHandler: function(messageFilter, handler) {
        require('tribe/handlers/statics').register(messageFilter, handler);
    }
})