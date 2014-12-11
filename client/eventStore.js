var storage = require('tribe.storage'),
    expressions = require('tribe.expressions'),
    actors = require('tribe/actors'),
    Q = require('q'),
    messages, db;

// really just provides lazy initialisation of our object store
module.exports = {
    store: function (envelopes) {
        return Q.when(initialise()).then(function () {
            return messages.store(envelopes);
        })
    },
    retrieve: function (scope) {
        return Q.when(initialise())
            .then(function () {
                return messages.retrieve(expressions.create(scope, 'data'));
            });
    },
    close: function () {
        db && db.close();
    }
}

function initialise() {
    if(!db)
        return storage.open([{ name: 'messages', indexes: actors.indexes(), keyPath: 'clientSeq', autoIncrement: true }])
            .then(function (provider) {
                db = provider;
                messages = provider.entity('messages');
            })
}