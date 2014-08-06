require('tribe').register.model(function(pane) {
    var self = this,
    _ = require('underscore'),
    test = pane.data;

    this.test = test;

    this.state = ko.computed(function () {
        if (_.keys(test.results()).length === 0)
            return 'not run';
        return _.any(test.results(), function (result) {
            return result.state() === 'failed';
        }) ? 'failed' : 'passed';
    });

    this.showDetails = ko.observable(self.state() === 'failed');

    this.toggleDetails = function () {
        self.showDetails(!self.showDetails());
    };

    this.run = function () {
        pane.pubsub.publish({ topic: 'test.run', data: [{ fixture: test.fixture, title: test.title }], channelId: '__test' });
    };

    this.stepInto = function () {
        var message = { topic: 'test.run', data: [{ fixture: test.fixture, title: test.title, stepInto: true }], channelId: '__test' };
        if (test.browser)
            pane.pubsub.publish(message);
        else
            require('../modules/debugWindow').open().then(function () {
                pane.pubsub.publish(message);
            });
    };

    this.select = function () {
        test.selected(!test.selected());
    };

    self.state.subscribe(function (state) {
        self.showDetails(state === 'failed');
    });
})