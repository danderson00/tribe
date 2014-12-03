﻿var _ = require('underscore');

module.exports = {
    extendTest: function (test) {
        return {
            title: test.title,
            fixture: test.fixture,
            filename: test.filename,
            browser: test.browser,
            stale: ko.observable(true),
            results: ko.observableArray(),
            selected: ko.observable(true),
            pending: ko.observable()
        };
    },

    extendFixture: function (fixture) {
        return {
            title: fixture.title,
            fixtures: ko.observableArray(_.map(fixture.fixtures, module.exports.extendFixture)),
            tests: ko.observableArray(_.map(fixture.tests, module.exports.extendTest))
        };
    },

    createFixture: function (title, parent) {
        var fixture = {
            title: title,
            fixtures: ko.observableArray(),
            tests: ko.observableArray()
        };
        if (parent) parent.fixtures.push(fixture);
        return fixture;
    },

    createTest: function (from, fixture) {
        var test = this.extendTest(from);
        fixture.tests.push(test);
        return test;
    },

    createResult: function (agent, test) {
        var result = {
            agent: agent,
            state: ko.observable(),
            error: ko.observable(),
            duration: ko.observable(),
            output: ko.observable()
        };
        test.results.push(result);
        return result;
    },

    specs: function (tests) {
        return _.map(tests, function (test) {
            return {
                title: test.title,
                fixture: test.fixture
            };
        });
    }
};
