var qunit = require('tribe/test/qunit'),
    options = require('tribe/options');

T.registerHandler('test.run', function (handler, envelope) {
    qunit.run(options.modulePath + '/tests', handler);
});