var Mocha = require('mocha'),
    testRequire = require('tribe/test/require'),
    consoleCapture = require('tribe/test/consoleCapture'),
    pubsub = require('tribe.pubsub'),
    log = require('tribe.logger'),
    options = require('tribe/options'),
    convert = require('./convert');

module.exports = {
    run: function (suite, reporter) {
        var runner = new Mocha.Runner(suite),
            capture;

        setReporter(reporter, runner);

        runner.on('test', function (test) {
            test.agent = options.test.agent;
            broadcastEvent('test.start', test);
            testRequire.enable();
            capture = consoleCapture.capture();
        });

        runner.on('fail', function (test, error) {
            testRequire.disable();
            test.error = error;
            test.output = capture.end();
            test.agent = options.test.agent;
            broadcastEvent('test.complete', test, error);
        });

        runner.on('pass', function (test) {
            testRequire.disable();
            test.output = capture.end();
            test.agent = options.test.agent;
            broadcastEvent('test.complete', test);
        });

        runner.on('start', function () {
            broadcastEvent('test.runStarted');
        });

        runner.on('end', function () {
            broadcastEvent('test.runEnded');
        });

        runner.run();
    }
};

function broadcastEvent(topic, test, error) {
    pubsub.publish({ channelId: '__test', topic: topic, data: test && convert.test(test, error) });
}

function setReporter(reporter, runner) {
    if(reporter)
        try {
            var m = require('mocha/lib/reporters/' + reporter);
            new m(runner);
        } catch (ex) {
            log.warn('Invalid mocha reporter: ' + reporter);
        }
}
