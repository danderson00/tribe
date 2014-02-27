(function(T) {
//<%= content %>       
})({
    registerSaga: function(constructor) {
        require('tribe/handlers/sagas').register(this.scriptEnvironment.resourcePath, constructor);
    },
    registerHandler: function(messageFilter, handler) {
        require('tribe/handlers/statics').register(messageFilter, handler);
    }
})