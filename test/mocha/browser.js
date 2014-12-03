﻿var pubsub = require('tribe.pubsub'),
    options = require('tribe/options'),
    script = require('tribe/utilities/script'),
    runner = require('./runner'),
    overrides = require('./overrides'),
    construct = require('./construct'),
    Mocha = require('mocha'),
    chai = require('chai'),
    sinon = require('sinon'),
    useragent = require('tribe/utilities/ua-parser'),
    _ = require('underscore'),
    testWrappers = {},
    mocha;

module.exports = {
    register: function (path, wrapper) {
        testWrappers[path] = wrapper;
    },
    initialise: function () {
        var browser = useragent(window.navigator.userAgent).browser;
        options.test.agent = browser.name + ' ' + browser.version;
        mocha = new Mocha(options.test.mocha);
        _.each(testWrappers, load);
    },
    run: function (tests) {
        return runner.run(tests ? construct.suite(mocha, tests) : mocha.suite);
    }
};

function load(wrapper, path) {
    var context = { expect: chai.expect, assert: chai.assert, sinon: sinon };

    // load up context object with mocha interface
    mocha.suite.emit('pre-require', context, path, mocha);

    script.applyWrapper(wrapper, context);
}

// hack for mocha to work in IE?
Mocha.Runner.immediately = function (callback) {
    return setTimeout(callback, 0);
};

pubsub.sync = true;

pubsub.subscribe('test.run', module.exports.run);

pubsub.subscribe('test.start', function (test) {
    if (test.agent === options.test.agent)
        document.body.innerHTML = '';
});

pubsub.subscribe('test.reloadAgent', function () {
    window.location.reload(true);
});

// mocha expects the process object to have a removeListener function
process.removeListener = process.removeListener || process.off;