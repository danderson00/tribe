// hack to get knockout working in sagas - when we load sagas using the resource loader, provide ko as an argument instead
ko = require('knockout');

var store = require('tribe/store/fs'),
    serializer = require('tribe/serializer');

var sagas = {
    start: function (path, id, data) {
        var saga = createSaga(path);
        var onstart = saga.handles.onstart;
        if (onstart) onstart(data);
        storeSagaData(saga, path, id);
    },
    handle: function (envelope) {
        if (envelope.sagaId) {
            store.get(envelope.sagaId, envelope.sagaId)
                .then(function (data) {
                    var saga = createSaga(data.path);
                    saga.data = serializer.deserialize(data.data);
                    var handler = saga.handles[envelope.topic];
                    if (handler) handler(envelope.data, envelope);
                    storeSagaData(saga, data.path, envelope.sagaId);
                })
                .fail(console.error);
        }
    },
    register: function (path, constructor) {
        sagas[path] = { constructor: constructor };
    }
};

module.exports = sagas;
    
function storeSagaData(saga, path, id) {
    store.put(id, id, {
        path: path,
        data: serializer.serialize(saga.data),
        id: id
    });
}

function createSaga(path) {
    var pubsub = require('pubsub');
    return new Tribe.PubSub.Saga(pubsub, sagas[path].constructor);
}
