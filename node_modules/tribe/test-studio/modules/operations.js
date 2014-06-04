var queries = require('./queries'),
    _ = require('underscore');

module.exports = {
    updateTest: function (test, update) {
        test.stale(update.state === undefined);
        if (update.state) {
            // we may not know how many clients are out there, just clear pending on any result
            test.pending(false);

            var result = queries.findResult(update.agent, test);
            result.state(update.state);
            result.error(update.error);
            result.duration(update.duration);
            result.output(update.output);
        }
    },

    removeTest: function (test, suite) {
        var fixture = queries.for(suite).findFixture(test.fixture);
        fixture.tests.splice(fixture.tests.indexOf(test), 1);
    },

    setPending: function (fixture, tests) {
        var query = queries.for(fixture);

        if (!tests)
            _.each(query.allTests(), function (test) {
                test.pending(true);
            });
        else
            _.each(tests, function (test) {
                query.findTest(test).pending(true);
            });
    }
};