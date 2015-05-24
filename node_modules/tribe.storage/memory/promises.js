var Q = require('q');

module.exports = {
    resolved: function (result) {
        var promise = Q.defer();
        promise.resolve(result);
        return promise.promise;
    }
}
