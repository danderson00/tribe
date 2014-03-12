var _ = require('underscore'),
    log = require('tribe/logger');

module.exports = {
    test: convertTest,
    suite: convertSuite
};

function convertSuite(suite) {
    var fixture = {};
    fixture.tests = _.map(suite.tests, convertTest);
    fixture.fixtures = _.reduce(suite.suites, function (fixtures, suite) {
        fixtures[suite.title] = convertSuite(suite);
        return fixtures;
    }, {});
    return fixture;
}

function convertTest(test) {
    return {
        name: test.title,
        fixture: fixtureFor(test),
        duration: test.duration,
        filename: test.filename,
        state: test.state,
        error: test.error && log.errorDetails(test.error)
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