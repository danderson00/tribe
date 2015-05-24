var indexes = require('./indexes'),
    keyPath = require('tribe.expressions/keyPath');

module.exports = function (store, definition) {
    return {
        store: function (entity) {
            return store.put(entity).then(function (result) {
                if (definition.keyPath) {
                    if (result.constructor === Array)
                        for (var i = 0, l = result.length; i < l; i++)
                            keyPath.set(definition.keyPath, entity[i], result[i]);
                    else
                        keyPath.set(definition.keyPath, entity, result);
                }
                return entity;
            });
        },
        retrieve: function (expression) {
            if (expression.constructor === Array && expression.length === 1)
                expression = expression[0];

            return store.index(indexes.indexName(expression), indexes.convertExpression(expression));
        },
        clear: function () {
            return store.clear();
        }
    };
};
