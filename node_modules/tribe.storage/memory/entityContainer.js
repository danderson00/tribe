var keyPath = require('tribe.expressions/keyPath'),
    evaluate = require('tribe.expressions/evaluate'),
    promises = require('./promises'),
    sequence = require('./sequence');

module.exports = function (entityData) {
    var entities = {},
        seq = sequence();

    return {
        store: function (entity) {
            if(entity.constructor === Array)
                for(var i = 0, l = entity.length; i < l; i++)
                    storeEntity(entity[i]);
            else
                storeEntity(entity);
            return promises.resolved(entity);
        },
        retrieve: function (expression) {
            var results = [];
            for(var id in entities)
                if(entities.hasOwnProperty(id) && evaluate(expression, entities[id]))
                    results.push(entities[id]);
            return promises.resolved(sort(expression, results));
        },
        clear: function () {
            entities = {};
            return promises.resolved();
        }
    }

    function storeEntity(entity) {
        var id = keyPath(entityData.keyPath || '__keyPath', entity);
        if(!id) {
            id = seq.next();
            if(entityData.keyPath)
                keyPath.set(entityData.keyPath, entity, id);
        }

        entities[id] = entity;
        return entity;
    }

    function sort(expression, results) {
        return results.sort(function (a, b) {
            if(expression.constructor === Array) {
                for(var i = 0, l = expression.length; i < l; i++) {
                    var result = compare(expression[i], a, b);
                    if(result !== 0)
                        return result;
                }
                return 0;
            } else {
                return compare(expression, a, b);
            }
        });

        function compare(expression, a, b) {
            var aValue = keyPath(expression.p, a),
                bValue = keyPath(expression.p, b);
            if(aValue < bValue)
                return -1;
            if(aValue > bValue)
                return 1;
            return 0;
        }
    }
};
