(function(T) {
//

// Sagas/session.js


T.scriptEnvironment = { resourcePath: '/session' };

T.registerSaga(function (saga) {
    var fixture;

    saga.handles = {
        onstart: function (data) {
            fixture = extendFixture(data);
        },
        'test.complete': updateTest,
        'test.loaded': updateTest,
        'test.removed': removeTest
    };

    function updateTest(update) {
        var test = findTest(update);
        test.state(update.state);
        test.error(update.error);
        test.duration(update.duration);
    }

    function extendFixture(fixture) {
        var fixtures = $.map(fixture.fixtures, function (value) { return extendFixture(value); });
        fixture.fixtureArray = ko.observableArray(fixtures);
        fixture.tests = ko.observableArray($.map(fixture.tests, extendTest));
        return fixture;
    }

    function extendTest(test) {
        test.state = ko.observable(test.state);
        test.error = ko.observable(test.error);
        test.duration = ko.observable(test.duration);
        test.selected = ko.observable(true);
        return test;
    }

    function findTest(test) {
        var testFixture = findFixture(test.fixture),
            sagaTest = $.grep(testFixture.tests(), function (currentTest) {
                return currentTest.name === test.name;
            })[0];

        if (!sagaTest) {
            sagaTest = extendTest(test);
            testFixture.tests.push(sagaTest);
        }

        return sagaTest;
    }

    function removeTest(test) {
        var testFixture = findFixture(test.fixture),
            test = $.grep(testFixture.tests(), function (currentTest) {
                return currentTest.name === test.name;
            })[0];
        testFixture.tests.splice(testFixture.tests.indexOf(test), 1);
    }

    function findFixture(spec) {
        var current = fixture;
        // need a reduce function
        $.each(spec, function (index, title) {
            current = current.fixtures[title];
        });
        return current;
    }
});


       
})({
    registerSaga: function(constructor) {
        require('tribe/handlers/sagas').register(this.scriptEnvironment.resourcePath, constructor);
    },
    registerHandler: function(messageFilter, handler) {
        require('tribe/handlers/statics').register(messageFilter, handler);
    }
})