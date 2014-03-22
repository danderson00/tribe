var options = require('tribe/options'),
    tests = require('tribe/test');

options.test.mocha.reporter = 'dot';
tests.loadDirectory(options.testPath).then(function () {
    tests.run();
});