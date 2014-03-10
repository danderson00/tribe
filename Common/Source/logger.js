(function () {
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
                console.error(('ERROR: ' + message + '\n'), api.errorDetails(error));
        },
        errorDetails: function (ex) {
            if (!ex) return '';
            return (ex.constructor === String) ? ex :
                (ex.stack || '') + (ex.inner ? '\n\n' + this.errorDetails(ex.inner) : '\n');
        }
    };
    api.log = api.debug;
    
    if (typeof (exports) !== 'undefined' && typeof (module) !== 'undefined')
        module.exports = api;
    else {
        if (typeof (T) === 'undefined')
            T = {};
        T.logger = api;
    }
})();

