// setup.js
if (typeof (T) === 'undefined')
    T = { Types: {} }

// Types/Logger.js
T.Types.Logger = (function () {
    var level = 4;
    var levels = {
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        none: 0
    };

    var api = {
        setLevel: function (newLevel) {
            level = levels[newLevel];
            if (level === undefined) level = 4;
        },
        debug: function (message) {
            if (level >= 4)
                console.log(('DEBUG: ' + message));
        },
        info: function (message) {
            if (level >= 3)
                console.info(('INFO: ' + message));
        },
        warn: function (message) {
            if (level >= 2)
                console.warn(('WARN: ' + message));
        },
        error: function (message, error) {
            if (level >= 1)
                console.error(('ERROR: ' + message), error);
        }
    };
    api.log = api.debug;
    return api;
})();

if (typeof(module) !== 'undefined')
    module.exports = T.Types.Logger;
