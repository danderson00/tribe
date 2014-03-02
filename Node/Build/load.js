var fs = require('q-io/fs'),
    vm = require('vm'),
    q = require('q'),
    _ = require('underscore'),
    utils = require('tribe/utilities'),
    path = require('path');

module.exports = {
    file: loadFile,
    directory: loadDirectory
};

function loadDirectory(pathOrOptions) {
    pathOrOptions = normaliseOptions(pathOrOptions);
    return fs.listTree(pathOrOptions.path, guard)
        .then(function (filePaths) {
            var promises = _.map(filePaths, function (filePath) {
                var options = _.extend({}, pathOrOptions, {
                    path: filePath,
                    debugPath: (pathOrOptions.debugPath || '') + path.normalize(filePath).replace(path.normalize(pathOrOptions.path), '').replace(/\\/g, '/')
                });
                return loadFile(options);
            });
            return q.all(promises);
        })
        .fail(utils.rethrow('Error loading directory: ' + JSON.stringify(pathOrOptions)));
}

function guard(path, stat) {
    return !stat.isDirectory();
}

function loadFile(pathOrOptions) {
    pathOrOptions = normaliseOptions(pathOrOptions);
    return fs.read(pathOrOptions.path)
        .then(function(source) {
            var withStatement = pathOrOptions.withArg ? 'with (' + pathOrOptions.withArg + ') {' : '';
            var pre = '(function(' + Object.keys(pathOrOptions.args).join(', ') + ') { ' + withStatement;
            var post = (pathOrOptions.withArg ? '} ' : '') + '} )';
            compiled = vm.runInNewContext(pre + source + post, pathOrOptions.global, 'http://' + pathOrOptions.debugDomain + '/' + pathOrOptions.debugPath);
            return compiled.apply(pathOrOptions.thisArg, values(pathOrOptions.args));
        })
        .fail(utils.rethrow('Error loading file: ' + JSON.stringify(pathOrOptions)));
}

function values(source) {
    var values = [];
    for (var property in source)
        if (source.hasOwnProperty(property))
            values.push(source[property]);
    return values;
}

function normaliseOptions(pathOrOptions) {
    return pathOrOptions.constructor === String ?
        { path: pathOrOptions } :
        pathOrOptions;
}