﻿T.registerModel(function (pane) {
    var self = this,
        test = pane.data;

    this.test = test;

    this.error = ko.computed(function () {
        var error = test.error();
        return error && error.replace(/\n/g, '<br/>');
    });

    this.output = ko.computed(function () {
        var output = test.output();
        return output && output.replace(/\n/g, '<br/>');
    });

    this.showDetails = ko.observable(test.state() === 'failed');

    this.toggleDetails = function () {
        self.showDetails(!self.showDetails());
    };

    this.run = function () {
        pane.pubsub.publish({ topic: 'test.run', data: [{ fixture: test.fixture, title: test.title }], channelId: '__test' });
    };

    this.stepInto = function () {
        pane.pubsub.publish({ topic: 'test.run', data: [{ fixture: test.fixture, title: test.title, stepInto: true }], channelId: '__test' });
        require('debugWindow').open();
    };

    this.select = function () {
        test.selected(!test.selected());
    };

    this.test.state.subscribe(function (state) {
        if (state === 'failed')
            self.showDetails(true);
    });
});