﻿require('tribe').register.actor(function (actor) {
    var self = this;

    actor.isDistributed();

    actor.handles = {
        'browserTest.setValue': function (value) {
            self.value(value);
        }
    };

    self.value = ko.observable('unset');
});