var _ = require('underscore'),
    construct = require('./construct');

module.exports = {
    findResult: function (agent, test) {
        var result = _.findWhere(test.results(), { agent: agent });
        return result || construct.createResult(agent, test);
    },


    'for': function (suite) {
        var queries = {
            findTest: function (test) {
                var fixture = queries.findFixture(test.fixture),
                    tests = fixture.tests();

                for (var i = 0, l = tests.length; i < l; i++)
                    if (tests[i].title === test.title)
                        return tests[i];

                return construct.createTest(test, fixture);
            },

            findFixture: function (spec) {
                return _.reduce(spec.split('.'), function (current, title) {
                    return _.findWhere(current.fixtures(), { title: title }) || construct.createFixture(title, current);
                }, suite);
            },

            findResult: module.exports.findResult,

            allTests: function (fixture) {
                fixture = fixture || suite;
                return fixture.tests().concat(_.flatten(_.map(fixture.fixtures(), queries.allTests)));
            },

            filter: function (callback, fixture) {
                fixture = fixture || suite;
                var childTests = _.flatten(_.map(fixture.fixtures(), function (childFixture) {
                    return queries.filter(callback, childFixture);
                }));
                return _.filter(fixture.tests(), callback).concat(childTests);
            },

            where: function (property, value, fixture) {
                fixture = fixture || suite;
                var childTests = _.flatten(_.map(fixture.fixtures(), function (childFixture) {
                    return queries.where(property, value, childFixture);
                }));
                return _.filter(fixture.tests(), function (test) {
                    return ko.utils.unwrapObservable(test[property]) === value;
                }).concat(childTests);
            },

            allResults: function (fixture) {
                fixture = fixture || suite;
                var results = _.invoke(fixture.tests(), 'results');
                var childResults = _.map(fixture.fixtures(), queries.allResults);
                return _.flatten([results, childResults]);
            },

            resultsWhere: function (property, value, fixture) {
                return _.filter(queries.allResults(fixture), function (result) {
                    return ko.utils.unwrapObservable(result[property]) === value;
                });
            }
        };
        return queries;
    }
};
