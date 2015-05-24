var _ = require('underscore');

var utils = module.exports = {
    contentSize: function (collection) {
        return _.map(collection, function (content, key) {
            return key + ': ' + utils.size(content.length);
        }).join(', ');
    },
    size: function (bytes) {
        if (bytes > 1000000)
            return (bytes / 1000000).toFixed(2) + 'MB';
        if (bytes > 1000)
            return (bytes / 1000).toFixed(2) + 'kB';
    }
}