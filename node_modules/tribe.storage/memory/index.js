var entityContainer = require('./entityContainer'),
    promises = require('./promises');

var api = module.exports = {
    open: function (options, entities) {
        // no initialisation required, just return a resolved promise
        return promises.resolved();
    },
    entityContainer: function (entity) {
        return entityContainer(entity);
    }
};
