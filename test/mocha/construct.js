﻿var Mocha = require('mocha'),
    _ = require('underscore');

module.exports = {
    suite: constructSuite
};

function constructSuite(mocha, tests) {
    var suite = new Mocha.Suite('', new Mocha.Context);
    _.each(tests, function (test) {
        var testSuite = Mocha.Suite.create(suite, test.fixture),
            actualTest = findTest(mocha, test);

        if (actualTest) {
            testSuite._beforeEach = actualTest.parent._beforeEach;

            var newTest = new Mocha.Test(actualTest.title, actualTest.originalFn || actualTest.fn);
            newTest.stepInto = test.stepInto;
            testSuite.addTest(newTest);
        }
    });
    return suite;
}

function findTest(mocha, test) {
    var testSuite = _.reduce(test.fixture.split('.'), function (suite, title) {
        return suite && _.findWhere(suite.suites, { title: title });
    }, mocha.suite);
    return testSuite && _.findWhere(testSuite.tests, { title: test.title });
}
