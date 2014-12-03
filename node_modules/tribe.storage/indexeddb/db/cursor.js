var Q = require('q');

module.exports = function (db, name, args) {
    return evaluateCursor(db.transaction([name]).objectStore(name).openCursor(args));
};

module.exports.index = function (db, store, index, keyRange) {
    return evaluateCursor(db.transaction([store]).objectStore(store).index(index).openCursor(keyRange));
};

function evaluateCursor(cursor) {
    var promise = Q.defer(),
        results = [];

    cursor.onsuccess = function (event) {
        var result = event.target.result;
        if (result) {
            results.push(result.value);
            result.continue();
        }
        else
            promise.resolve(results);
    };

    cursor.onerror = function (event) {
        promise.reject(this.error);
    };

    return promise.promise;
};
