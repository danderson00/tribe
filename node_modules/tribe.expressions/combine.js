var flatten = require('tribe.functional/flatten');

module.exports = function(expressions) {
    // this exists in case it should be more sophisticated?
    return flatten(Array.prototype.slice.call(arguments));
};
