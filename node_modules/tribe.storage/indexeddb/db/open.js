var Q = require('q'),
    store = require('./store');

module.exports = function (name, version, upgrade) {
    return module.exports.db(name, version, upgrade).then(function (database) {
        return {
            store: function (entity) {
                return store(database, entity);
            },
            close: function () {
                database.close();
            }
        };
    });
};

module.exports.db = function (name, version, upgrade) {
    var promise = Q.defer(),
        req = window.indexedDB.open(name, version);

    req.onupgradeneeded = function (event) {
        upgrade(event.target.result, event.currentTarget.transaction);
    };

    req.onsuccess = function (event) {
        promise.resolve(event.target.result);
    };

    req.onerror = function (event) {
        promise.reject(this.error);
    };

    return promise.promise;
}