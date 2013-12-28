(function() {
    var store = require('tribe/store/fs');
    var serializer = require('tribe/serializer');

    var sagas = {
        start: function (path, id, data) {
            var saga = createSaga(path);
            var onstart = saga.handles.onstart;
            if (onstart) onstart(data);
            storeSaga(saga, path, id);
        },
        handle: function (envelope) {
            if (envelope.sagaId) {
                store.get(envelope.sagaId, envelope.sagaId)
                    .then(function (data) {
                        var saga = createSaga(data.path);
                        saga.data = serializer.deserialize(data.data);
                        var handler = saga.handles[envelope.topic];
                        if (handler) handler(envelope.data, envelope);
                        storeSaga(saga, data.path, envelope.sagaId);
                    })
                    .fail(console.error);
            }
        }
    };

    module.exports = sagas;
    
    function storeSaga(saga, path, id) {
        store.put(id, id, {
            path: path,
            data: serializer.serialize(saga.data),
            id: id
        });
    }

    function createSaga(path) {
        var pubsub = require('tribe/pubsub');
        return new Tribe.PubSub.Saga(pubsub, sagas[path].constructor);
    }
})();
