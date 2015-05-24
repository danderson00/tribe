var queries = require('./queries'),
    keyPath = require('tribe.expressions/keyPath'),
    _ = require('underscore'),
    Q = require('q');

module.exports = function (entityData, database) {
    return {
        store: function (entities) {
            if (entities.constructor === Array)
                return Q.all(_.map(entities, storeEntity));
            return storeEntity(entities);

            function storeEntity(entity) {
                return database
                    .run(queries.store(entityData, entity))
                    .then(function (result) {
                        if (entityData.keyPath)
                            keyPath.set(entityData.keyPath, entity, result);
                        return entity;
                    });
            }
        },
        retrieve: function (predicates) {
            return database.all(queries.retrieve(entityData.name, predicates)).then(function (rows) {
                return _.map(rows, function (row) {
                    var result = JSON.parse(row.__content);
                    if (entityData.keyPath)
                        keyPath.set(entityData.keyPath, result, row[entityData.keyPath.replace(/\./g, '_')]);
                    return result;
                });
            });
        },
        clear: function () {
            return database.run(queries.clear(entityData.name));
        }
    };
}
