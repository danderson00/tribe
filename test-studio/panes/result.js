﻿require('tribe').register.model(function(pane) {
    var self = this,
    _ = require('underscore'),
    result = pane.data;

    this.result = result;

    this.error = ko.computed(function () {
        var error = result.error();
        return error && _.escape(error).replace(/\n/g, '<br/>');
    });

    this.output = ko.computed(function () {
        var output = result.output();
        return output && output.replace(/\n/g, '<br/>');
    });
})