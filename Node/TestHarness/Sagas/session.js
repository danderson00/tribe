require('tribe').register.saga(function (saga) {
    var queries, suite;

    saga.handles = {
        onstart: function (data) {
            suite = data;
            queries = require('queries').for(suite);
        },
        'test.complete': function (test) {
            queries.updateTest(test);
        },
        'test.loaded': function (test) {
            queries.updateTest(test);
        },
        'test.removed': function (test) {
            queries.removeTest(test);
        }
    };
});
