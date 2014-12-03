﻿require('tribe').register.model(function(pane) {
    var self = this;

    this.hidden = ko.observable(true);

    this.hide = function () {
        self.hidden(true);
    };

    pane.pubsub.subscribe('ui.showFixture', function () {
        self.hidden(false);
    });
})