var Mocha = require('mocha'),
    mocha = new Mocha(),
    chai = require('chai'),
    sinon = require('sinon'),
    load = require('tribe/load'),
    testRequire = require('tribe/test/require'),
    overrides = require('tribe/test/mocha/overrides'),
    channels = require('tribe/server/channels'),
    log = require('tribe/logger');

mocha.suite.title = 'Server';
mocha.ui('tdd');

module.exports = {
    run: function () {
        var runner = new Mocha.Runner(mocha.suite);

        runner.on('test', function (test) {
            broadcastEvent('test.start', test);
            testRequire.enable();
        });

        runner.on('fail', function (test, error) {
            broadcastEvent('test.complete', test, error);
            testRequire.disable();
        });

        runner.on('pass', function (test) {
            broadcastEvent('test.complete', test);
            testRequire.disable();
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
    }
};

function broadcastEvent(topic, test, error) {
    channels.broadcastTo('__test', { topic: topic, data: convertTest(test, error) });
}

function convertTest(test, error) {
    return {
        name: test.title,
        fixture: testFixture(test),
        duration: test.duration,
        filename: test.filename,
        state: test.state,
        error: error && log.errorDetails(error)
    };
}

function testFixture(test, fixtures) {
    fixtures = fixtures || [];
    if (test.parent) {
        fixtures.unshift(test.parent.title);
        testFixture(test.parent, fixtures);
    }
    return fixtures;
}