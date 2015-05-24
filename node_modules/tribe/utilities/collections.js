var _ = require('underscore');

module.exports = {
    sortObject: function (map) {
        var keys = _.sortBy(_.keys(map), function (a) { return a; });
        var newmap = {};
        _.each(keys, function (k) {
            newmap[k] = map[k];
        });
        return newmap;
    }
}