var runner = require('tribe/test'),
    options = require('tribe/options');

runner.loadDirectory(options.modulePath + '/tests/server');
T.registerHandler('test.run', function (handler, envelope) {
    runner.run();
});