﻿var _ = require('underscore'),
    log = require('tribe.logger');

module.exports = {
    test: convertTest,
    suite: convertSuite
};

function convertSuite(suite) {
    var fixture = {};
    fixture.title = suite.title;
    fixture.tests = _.map(suite.tests, convertTest);
    fixture.fixtures = _.map(suite.suites, convertSuite);
    //fixture.fixtures = _.reduce(suite.suites, function (fixtures, suite) {
    //    fixtures[suite.title] = convertSuite(suite);
    //    return fixtures;
    //}, {});
    return fixture;
}

function convertTest(test) {
    return {
        title: test.title,
        fixture: fixtureFor(test).join('.'),
        duration: test.duration,
        filename: test.filename,
        browser: test.browser,
        state: test.state,
        error: test.error && log.errorDetails(test.error),
        output: test.output,
        agent: test.agent
    };
}

function fixtureFor(test, fixtures) {
    fixtures = fixtures || [];
    if (test.parent) {
        if(test.parent.parent) fixtures.unshift(test.parent.title);
        fixtureFor(test.parent, fixtures);
    }
    return fixtures;
}