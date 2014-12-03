﻿// pure nasty hackiness... if the benefits weren't so sweet, I'd shoot myself for writing this.
module.exports = {
    execute: function (source, args, thisArg, require, module, exports) {
        var executeArgs = this.attachCalleeArguments(args, {
            require: require,
            module: module,
            exports: exports
        });

        var compiled = eval.call(thisArg, constructSource(source, executeArgs));
        return compiled.apply(thisArg, values(executeArgs));
    },
    argumentNames: function (func) {
        var argString = func.toString().match(/\(([^\)]*)\)/)[1];
        if (!argString) return [];
        return argString.split(',');
    },
    attachCalleeArguments: function (args, to) {
        var names = this.argumentNames(args.callee);
        for (var i = 0, l = names.length; i < l; i++)
            to[names[i]] = args[i];
        return to;
    }
};

function constructSource(source, args) {
    var pre = '(function(' + Object.keys(args).join(', ') + ') {\n';
    var post = '})';

    return pre + source + post;
}

function values(object) {
    var values = [];
    for (var property in object)
        if (object.hasOwnProperty(property))
            values.push(object[property]);
    return values;
}