var Mocha = require('mocha'),
    mocha = new Mocha(),
    chai = require('chai'),
    sinon = require('sinon'),
    load = require('tribe/load'),
    log = require('tribe/logger'),
    testRequire = require('tribe/test/require'),
    channels = require('tribe/server/channels'),
    overrides = require('./overrides'),
    convert = require('./convert'),
    service = require('./service');

mocha.ui('tdd');

module.exports = {
    run: function () {
        var runner = new Mocha.Runner(mocha.suite);

        runner.on('test', function (test) {
            broadcastEvent('test.start', test);
            testRequire.enable();
        });

        runner.on('fail', function (test, error) {
            testRequire.disable();
            test.error = error;
            broadcastEvent('test.complete', test, error);
        });

        runner.on('pass', function (test) {
            testRequire.disable();
            broadcastEvent('test.complete', test);
        });

        runner.run();
    },
    loadFile: function (path, debugPath) {
        var context = {},
            originalAddTest;

        // loads up the context object with the selected mocha interface
        mocha.suite.emit('pre-require', context, path, mocha);

        return load.file({
            path: path,
            debugPath: debugPath,
            debugDomain: 'Tests',
            args: { context: context, stub: testRequire.stub, expect: chai.expect, assert: chai.assert, sinon: sinon },
            withArg: 'context',
            beforeExecute: override,
            afterExecute: restore
        }).fail(broadcastError);

        function override(filename) {
            originalAddTest = Mocha.Suite.prototype.addTest;
            Mocha.Suite.prototype.addTest = function (test) {
                originalAddTest.call(this, test)

                // we can add the line number of the test from the stack trace
                // use this for setting breakpoints for individual tests automatically
                test.filename = path;

                broadcastEvent('test.loaded', test);
                log.debug('Loaded test "' + test.title + '" from ' + path);
            };
        }

        function restore() {
            Mocha.Suite.prototype.addTest = originalAddTest;
        }

        function broadcastError(error) {
            log.error('Error loading test file ' + path, error);
            channels.broadcastTo('__test', { topic: 'test.error', data: log.errorDetails(error) });
        }
    },
    loadDirectory: function (path) {
        return load.enumerate(path, module.exports.loadFile);
    },
    tests: function () {
        return convert.suite(mocha.suite);
    }
};

function broadcastEvent(topic, test, error) {
    channels.broadcastTo('__test', { topic: topic, data: convert.test(test, error) });
}

