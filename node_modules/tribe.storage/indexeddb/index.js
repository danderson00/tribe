var open = require('./db/open'),
    reset = require('./reset'),
    metadata = require('./metadata'),
    upgrade = require('./upgrade'),
    entityContainer = require('./entityContainer'),
    Q = require('q'),
        
    db;

var api = module.exports = {
    open: function (options, entities) {
        options = options || {};

        return Q.when(resetIfRequired())
            .then(metadata)
            .then(function (oldData) {
                var version = (oldData ? oldData.version : 0) + 1;
                return metadata(version, entities)
                    .then(function (data) {
                        return open(data.name, data.version, upgrade(data.entities, oldData && oldData.entities));
                    });
            })
            .then(function (database) {
                db = database;
            });

        function resetIfRequired() {
            if (options.reset)
                return reset();
        }
    },
    entityContainer: function (name) {
        return entityContainer(db.store(name));
    },
    close: function () {
        db && db.close();
        metadata.close();
    }
};