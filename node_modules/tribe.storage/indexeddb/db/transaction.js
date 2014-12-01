var Q = require('q');

module.exports = function (transaction) {
    var promise = Q.defer();

    transaction.oncomplete = function (event) {
        promise.resolve(event.target.result);
    };

    transaction.onerror = function (event) {
        var error = this.error || new Error(event.target.error.message);
        promise.reject(error);
    };

    return promise.promise;
};
