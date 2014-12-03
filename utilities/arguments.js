﻿var _ = require('underscore');

module.exports = function (args) {
    var byConstructor = {};
    _.each(_.toArray(args), function (arg) {
        byConstructor[arg.constructor] = arg;
    });

    return {
        byConstructor: function (constructor) {
            return byConstructor(constructor);
        },
        object: byConstructor[Object],
        string: byConstructor[String],
        func: byConstructor[Function],
        array: byConstructor[Array],
        number: byConstructor[Number]
    };
};