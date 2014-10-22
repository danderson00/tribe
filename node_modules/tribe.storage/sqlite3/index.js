// the sqlite3 eventStore adapter is intended for use on a single, non-clustered instance, mostly due to the sequence implementation.
// Using a SQL autoincrement column for the message ID will enable clustering, but this has performace penalties.
// For clustering on a single machine, a simple timestamp with precision in ticks is probably sufficient and avoids autoincrement.

var database = require('./database'),
    initialise = require('./initialise'),
    entityContainer = require('./entityContainer'),
    Q = require('q'),
    _ = require('underscore');

var api = module.exports = {
    open: function (options, entities) {
        options = options || {};
        database.open(options.filename);
        return Q.all(_.map(entities, function (entity) {
            return initialise(entity.name, entity.indexes, database);
        }));
    },
    entityContainer: function (name, indexes) {
        return entityContainer(name, indexes, database);
    }
};