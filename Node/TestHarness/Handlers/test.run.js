var qunit = require('tribe/test/qunit');

T.registerHandler('test.run', function (handler, envelope) {
    qunit.run(handler);
});