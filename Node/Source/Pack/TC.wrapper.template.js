(function(TC) {
//<%= content %>       
})({
    registerSaga: function(constructor) {
        var path = this.scriptEnvironment.resourcePath;
        require('tribe/sagas')[path] = { constructor: constructor };
    }
})