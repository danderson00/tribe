var test = require('tribe/test'),
    options = require('tribe/options');

module.exports = function () {
    return {
        fixture: test.tests(),
        inspectorPort: options.inspectorPort,
        debugPort: options.test.debugPort
    };
};