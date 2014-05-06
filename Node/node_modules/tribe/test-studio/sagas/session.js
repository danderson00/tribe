require('tribe').register.saga(function (saga) {
    var operations = require('operations'),
        queries, suite;

    saga.handles = {
        onstart: function (data) {
            suite = data;
            queries = require('queries').for(suite);
        },
        'test.complete': function (test) {
            operations.updateTest(queries.findTest(test), test);
        },
        'test.loaded': function (test) {
            operations.updateTest(queries.findTest(test), test);
        },
        'test.removed': function (test) {
            operations.removeTest(test, suite);
        },
        'test.run': function (tests) {
            operations.setPending(suite, tests);
        }
    };
});
