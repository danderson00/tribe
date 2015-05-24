var Q = require('q');

module.exports = function (name) {
    var promise = Q.defer(),
        request = window.indexedDB.deleteDatabase(name);

    //request.oncomplete = resolve;
    request.onsuccess = resolve;
    request.onerror = resolve;
    request.onblocked = blocked;

    return promise.promise;

    function resolve() {
        promise.resolve();
    }

    function blocked() {
        promise.resolve();
    }
};
