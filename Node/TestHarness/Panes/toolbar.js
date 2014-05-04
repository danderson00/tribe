T.registerModel(function (pane) {
    var fixture = pane.data,
        queries = require('queries').for(fixture);

    this.run = function () {
        pane.pubsub.publish({ topic: 'test.run', channelId: '__test' });
    };

    this.debug = function () {
        var debugWindow = window.open('http://localhost:8080/debug?port=5859', 'debugger');
        debugWindow.focus();
    };

    this.total = ko.computed(function () {
        return queries.allTests().length;
    });

    this.passed = ko.computed(function () {
        return queries.filter(function (test) {
            return test.state() === 'passed';
        }).length;
    });

    this.failed = ko.computed(function () {
        return queries.filter(function (test) {
            return test.state() === 'failed';
        }).length;
    });
});