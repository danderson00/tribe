var open = require('./open'),
    stores = {
        indexeddb: require('./indexeddb'),
        memory: require('./memory')
    };

module.exports = {
    open: function (entities, options) {
        options = options || {};
        options.type = options.type || 'indexeddb';
        return open(stores[options.type], entities, options);
    }
}
