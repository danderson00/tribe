var storage = require('tribe.storage'),
    expressions = require('tribe.expressions'),
    actors = require('tribe/actors'),
    log = require('tribe.logger'),
    Q = require('q'),
    messages, db;

// really just provides lazy initialisation of our object store
module.exports = {
    store: function (envelopes) {
        return Q.when(initialise()).then(function () {
            return messages.store(envelopes);
        }).fail(function (error) {
            log.error('Failed to store message', error);
        });
    },
    retrieve: function (scope) {
        return Q.when(initialise())
            .then(function () {
                return messages.retrieve(expressions.create(scope, 'data'));
            }).fail(function (error) {
                log.error('Failed to retrieve messages', error);
            });
    },
    close: function () {
        db && db.close();
        db = undefined;
    }
}

function initialise() {
    if(!db)
        return storage.open([{ name: 'messages', indexes: actors.indexes(), keyPath: 'clientSeq', autoIncrement: true }], { type: module.exports.type })
            .then(function (provider) {
                db = provider;
                messages = provider.entity('messages');
            })
}
