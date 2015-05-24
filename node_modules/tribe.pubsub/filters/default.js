var utils = require('../utils');

module.exports = function (topic) {
    var handlers = {};

    return {
        add: function (handler, token) {
            handlers[token] = handler;
        },
        remove: function (token) {
            delete handlers[token];
        },
        get: function (envelope) {
            return utils.values(handlers);
        }
    };
};