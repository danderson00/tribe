var queries = require('./queries'),
    _ = require('underscore'),
    Q = require('q');

module.exports = function (name, indexes, database) {
    return {
        store: function (entities) {
            if (entities.constructor === Array)
                return Q.all(_.map(entities, storeEntity));
            return storeEntity(entities);

            function storeEntity(entity) {
                return database.run(queries.store(name, indexes, entity));
            }
        },
        retrieve: function (predicates) {
            return database.all(queries.retrieve(name, predicates)).then(function (rows) {
                return _.map(rows, function (row) {
                    return JSON.parse(row.__content);
                });
            });
        }
    };
}
