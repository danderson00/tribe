var storage = require('tribe.storage'),
    provider;

module.exports = {
    initialise: function (entities, options) {
        return storage.open(entities, options).then(function (p) {
            provider = p;
            return provider;
        })
    },
    entity: function (name) {
        if (!provider) throw new Error("Not initialised");
        return provider.entity(name);
    }
}