require('tribe').register.model(function(pane) {
    var _ = require('underscore'),
        options = pane.data,
        queries = require('../modules/queries').for(options.fixture),
        construct = require('../modules/construct');

    this.run = {
        all: function () {
            run();
        },

        failing: function () {
            run(construct.specs(queries.where('state', 'failed')));
        },

        stale: function () {
            run(construct.specs(queries.where('stale', true)));
        },

        selected: function () {
            run(construct.specs(queries.where('selected', true)));
        }
    };

    function run(tests) {
        pane.pubsub.publish({ topic: 'test.run', data: tests, channelId: '__test' })
    }

    this.debug = function () {
        require('../modules/debugWindow').open();
    };

    this.restartProcess = function () {
        pane.pubsub.publish({ topic: 'test.restartProcess', channelId: '__test' });
    };

    this.showFixture = function () {
        pane.pubsub.publish('ui.showFixture');
    };

    this.duration = ko.computed(function () {
        return _.reduce(queries.allResults(), function (sum, result) {
            return sum + result.duration();
        }, 0);
    });

    this.total = ko.computed(function () {
        return queries.allResults().length;
    });

    this.passed = ko.computed(function () {
        return queries.resultsWhere('state', 'passed').length;
    });

    this.failed = ko.computed(function () {
        return queries.resultsWhere('state', 'failed').length;
    });

    this.stale = ko.computed(function () {
        return queries.where('stale', true).length;
    });
})