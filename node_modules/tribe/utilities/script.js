var options = require('tribe/options');

var script = module.exports = {
    evalInContext: function (source, context) {
        var compiled = eval(script.wrapper(source, context));
        return script.applyWrapper(compiled, context);
    },
    applyWrapper: function (wrapper, context) {
        wrapper.apply(context, values(context));
    },
    wrapper: function (source, context) {
        return '(function(' + keys(context).join(', ') + ') {' + source + '})';
    },
    toString: function (source) {
        return '"' + source.replace(/\r/g, '').replace(/\n/g, '\\n').replace(/\"/g, '\\"') + '"';
    },
    prepareForEval: function (source) {
        return source
            .replace(/\r/g, "")         // exclude windows linefeeds
            .replace(/\\/g, "\\\\")     // double escape
            .replace(/\n/g, "\\n")      // replace literal newlines with control characters
            .replace(/\"/g, "\\\"");    // escape double quotes
    },
    sourceUrlTag: function (path, basePath) {
        var sourceUrl;
        if (path.toLowerCase().indexOf(basePath.toLowerCase()) === 0)
            sourceUrl = 'http://app/' + path.substring(basePath.length).replace(/\\/g, '/');
        else if (path.toLowerCase().indexOf(options.modulePath.toLowerCase()) === 0)
            sourceUrl = 'http://tribe/' + path.substring(options.modulePath.length).replace(/\\/g, '/');
        else
            sourceUrl = path.replace(/\\/g, '/');

        return '\\n//@ sourceURL=' + sourceUrl + '\\n';
    }
}

function keys(context) {
    var keys = [];
    for (var property in context)
        if (context.hasOwnProperty(property))
            keys.push(property);
    return keys;
}

function values(context) {
    var values = [];
    for (var property in context)
        if (context.hasOwnProperty(property))
            values.push(context[property]);
    return values;
}