T.registerModel(function (pane) {
    var _ = require('underscore'),
        options = pane.data,
        queries = require('queries').for(options.fixture),
        construct = require('construct');

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
        var debugWindow = window.open('http://' + window.location.hostname + ':' + options.inspectorPort + '/debug?port=' + options.debugPort, 'debugger');
        debugWindow.focus();
    };

    this.total = ko.computed(function () {
        return queries.allTests().length;
    });

    this.passed = ko.computed(function () {
        return queries.where('state', 'passed').length;
    });

    this.failed = ko.computed(function () {
        return queries.where('state', 'failed').length;
    });

    this.stale = ko.computed(function () {
        return queries.where('stale', true).length;
    });

    this.duration = ko.computed(function () {
        return _.reduce(queries.allTests(), function (duration, test) {
            return duration + (test.duration() || 0);
        }, 0);
    });
});