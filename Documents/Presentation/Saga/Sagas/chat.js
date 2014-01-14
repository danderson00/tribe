TC.registerSaga(function (saga) {
    saga.data = { messages: ko.observableArray() };

    saga.handles = {
        'chat.message': function (message) {
            saga.data.messages.push(message);
        }
    };
});