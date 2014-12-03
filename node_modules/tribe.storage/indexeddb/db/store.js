var wrapper = require('./transaction'),
    cursor = require('./cursor');

module.exports = function (db, name) {
    return {
        add: function (entity) {
            return execute(function (store) {
                storeSingleOrArray(store, entity, 'add');
            }, true);
        },
        put: function (entity) {
            return execute(function (store) {
                storeSingleOrArray(store, entity, 'put');
            }, true);
        },
        single: function (key) {
            var request;
            return execute(function (store) {
                request = store.get(key);
            }).then(function () {
                return request.result;
            });
        },
        index: function (index, keyRange) {
            return cursor.index(db, name, index, keyRange);
        },
        all: function () {
            return cursor(db, name);
        },
        clear: function () {
            return execute(function (store) {
                store.clear();
            }, true);
        },
    };

    function storeSingleOrArray(store, target, operation) {
        if (target.constructor === Array)
            for (var i = 0, l = target.length; i < l; i++)
                store[operation](target[i]);
        else
            store[operation](target);
    }

    function execute(callback, writeable) {
        var transaction = db.transaction([name], writeable && 'readwrite'),
            store = transaction.objectStore(name),
            promise = wrapper(transaction);

        callback(store);

        return promise;
    }
};
