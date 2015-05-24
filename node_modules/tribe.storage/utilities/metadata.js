var objects = require('./objects');

module.exports = {
    entitiesHaveChanged: entitiesHaveChanged,
    indexesHaveChanged: indexesHaveChanged
}

function entitiesHaveChanged(oldEntities, newEntities) {
    if(!oldEntities)
        return true;

    var index = objects.indexOnProperty('name', oldEntities);
    for(var i = 0, l = newEntities.length; i < l; i++) {
        var newEntity = newEntities[i],
            oldEntity = index[newEntity.name];

        if(!oldEntity || indexesHaveChanged(newEntity.indexes, oldEntity.indexes))
            return true;
    }

    return false;
}

function indexesHaveChanged(newIndexes, oldIndexes) {
    return JSON.stringify(newIndexes) !== JSON.stringify(oldIndexes);
}
