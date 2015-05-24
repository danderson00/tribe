module.exports = function (store, entities, options) {
    return store.open(options, entities).then(function () {
        var hash = {};
        for (var i = 0, l = entities.length; i < l; i++)
            hash[entities[i].name] = entities[i];

        return {
            entity: function (name) {
                // this must be a lightweight operation, and the entityContainer must remain stateless, i.e. functions are deterministic across instances
                return store.entityContainer(hash[name]);
            },
            close: function () {
                if (store.close) store.close();
            }
        };
    });
}