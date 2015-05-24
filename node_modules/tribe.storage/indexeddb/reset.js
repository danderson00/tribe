var deleteDb = require('./db/delete');

module.exports = function () {
    return deleteDb('__metadata').then(function () {
        return deleteDb('__entities');
    });
};
