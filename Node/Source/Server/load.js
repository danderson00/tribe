var fs = require('q-io/fs'),
    vm = require('vm'),
    q = require('q'),
    _ = require('underscore');

module.exports = {
    file: loadFile,
    directory: loadDirectory
};

function loadDirectory(path, debugDomain, debugPath, args, withArg, thisArg) {
    return fs.listTree(path, guard)
        .then(function (files) {
            var promises = _.map(files, fs.read);
            return q.all(promises);
        });
}

function guard(path, stat) {
    return !stat.isDirectory();
}

function loadFile(path, debugDomain, debugPath, args, withArg, thisArg) {
    return fs.read(path)
        .then(function(source) {
            var withStatement = withArg ? 'with (' + withArg + ') {' : '';
            var pre = '(function(' + Object.keys(args).join(', ') + ') { ' + withStatement;
            var post = (withArg ? '} ' : '') + '} )';
            compiled = vm.runInThisContext(pre + source + post, 'http://' + debugDomain + '/' + debugPath);
            return compiled.apply(thisArg, values(args));
        });
}

function values(source) {
    var values = [];
    for (var property in source)
        if (source.hasOwnProperty(property))
            values.push(source[property]);
    return values;
}