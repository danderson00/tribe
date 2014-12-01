module.exports = function (entities, previousEntities) {
    return function (database, transaction) {
        for(var i = 0, l = entities.length; i < l; i++) {
            var entity = entities[i],
                store = retriveStore(entity.name);

            if(entity.indexes)
                for (var j = 0, l2 = entity.indexes.length; j < l2; j++)
                    createIndex(store, entity.indexes[j]);
        }

        function retriveStore(name) {
            if (!database.objectStoreNames.contains(name))
                return database.createObjectStore(name, { autoIncrement: true });

            return transaction.objectStore(name);
        }

        function createIndex(store, index) {
            var name = indexName(index);

            if (!store.indexNames.contains(name))
                store.createIndex(name, index, { unique: false });
        }
    };
}

function indexName(index) {
    if (index.constructor === Array)
        return index.join('_');
    return index;
}
