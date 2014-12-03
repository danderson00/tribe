var indexes = require('./indexes');

module.exports = function (store) {
    return {
        store: store.add,
        retrieve: function (expression) {
            return store.index(indexes.indexName(expression), indexes.convertExpression(expression));
        }
    };
};