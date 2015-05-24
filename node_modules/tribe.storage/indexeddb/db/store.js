var wrapper = require('./transaction'),
    cursor = require('./cursor');

module.exports = function (db, entity) {
    var name = entity.name;

    return {
        add: function (entity) {
            return execute(function (store) {
                return storeSingleOrArray(store, entity, 'add');
            }, true);
        },
        put: function (entity) {
            return execute(function (store) {
                return storeSingleOrArray(store, entity, 'put');
            }, true);
        },
        single: function (key) {
            var request;
            return execute(function (store) {
                return store.get(key);
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
                return store.clear();
            }, true);
        },
    };

    function storeSingleOrArray(store, target, operation) {
        if (target.constructor === Array) {
            var requests = [];
            for (var i = 0, l = target.length; i < l; i++)
                requests.push(store[operation](target[i]));
            return requests;
        }
        else
            return store[operation](target);
    }

    function execute(callback, writeable) {
        var transaction = db.transaction([name], writeable ? 'readwrite' : 'readonly'),
            store = transaction.objectStore(name),
            promise = wrapper(transaction);

        var request = callback(store);

        return promise.then(returnRequestResult);

        function returnRequestResult() {
            if (request.constructor === Array) {
                var results = [];
                for (var i = 0, l = request.length; i < l; i++)
                    results.push(request[i].result);
                return results;
            }
            return request.result;
        }
    }
};
