﻿require('tribe').register.actor(function (actor) {
    var operations = require('../modules/operations'),
        queries, suite;

    actor.isDistributed();

    actor.onstart = function (data) {
        suite = data;
        queries = require('../modules/queries').for(suite);
    };

    actor.handles = {
        'test.complete': function (test) {
            operations.updateTest(queries.findTest(test), test);
        },
        'test.loaded': function (test) {
            operations.updateTest(queries.findTest(test), test);
        },
        'test.removed': function (test) {
            operations.removeTest(queries.findTest(test), suite);
        },
        'test.run': function (tests) {
            operations.setPending(suite, tests);
        }
    };
});