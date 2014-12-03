var log = require('tribe.logger'),
    _ = require('underscore'),
    original = _.extend({ }, console);

module.exports = {
    capture: function () {
        var captured = '';

        console.log = replacement('log');
        console.debug = replacement('debug');
        console.info = replacement('info');
        console.warn = replacement('warn');
        console.error = replacement('error');

        return {
            end: function () {
                console.log = original.log;
                console.debug = original.debug;
                console.info = original.info;
                console.warn = original.warn;
                console.error = original.error;
                return captured;
            }
        };

        function replacement(name) {
            return function () {
                _.each(_.toArray(arguments), function (arg) {
                    if (arg.constructor === String)
                        captured += arg + '\n';
                    else if (arg.constructor === Error)
                        captured += log.errorDetails(arg) + '\n';
                    else
                        captured += JSON.stringify(arg) + '\n';
                });
            };
        }
    }
};
