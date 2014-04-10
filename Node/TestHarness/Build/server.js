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
        'test.complete': function (test) {
            updateTestFrom(test);
        }
    };

    function updateTestFrom(update) {
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
        return test;
    }

    function findTest(test) {
        var testFixture = findFixture(test.fixture);
        return $.grep(testFixture.tests(), function (currentTest) {
            return currentTest.name === test.name;
        })[0];
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




// Handlers/test.run.js


T.scriptEnvironment = { resourcePath: '/test.run' };

T.registerHandler('test.run', function (data) {
    require('tribe/test').run(data);
});

       
})({
    registerSaga: function(constructor) {
        require('tribe/handlers/sagas').register(this.scriptEnvironment.resourcePath, constructor);
    },
    registerHandler: function(messageFilter, handler) {
        require('tribe/handlers/statics').register(messageFilter, handler);
    }
})