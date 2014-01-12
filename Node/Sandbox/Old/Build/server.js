(function(TC) {
//

// Sagas/chat.js


TC.scriptEnvironment = { resourcePath: '/chat' };

TC.registerSaga(function (saga) {
    saga.data = { messages: ko.observableArray() };

    saga.handles = {
        'chat.message': function (message) {
            saga.data.messages.push(message);
        }
    };
});

       
})({
    registerSaga: function(constructor) {
        var path = this.scriptEnvironment.resourcePath;
        require('tribe/sagas')[path] = { constructor: constructor };
    }
})