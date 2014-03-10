var fs = require('q-io/fs'),
    vm = require('vm'),
    q = require('q'),
    _ = require('underscore'),
    utils = require('tribe/utilities'),
    path = require('path'),
    Module = require('module');

module.exports = {
    file: loadFile,
    directory: loadDirectory,
    enumerate: enumerateFiles
};

function loadFile(pathOrOptions) {
    pathOrOptions = normaliseOptions(pathOrOptions);
    return fs.read(pathOrOptions.path)
        .then(function (source) {
            extendArgs();

            var newModule = new Module(pathOrOptions.path);
            newModule.paths = Module._nodeModulePaths(pathOrOptions.path);
            newModule._compile(constructSource(source), debugPath());

            if (pathOrOptions.beforeExecute) pathOrOptions.beforeExecute(pathOrOptions.path);
            var result = newModule.exports.apply(pathOrOptions.thisArg, _.values(pathOrOptions.args));
            if (pathOrOptions.afterExecute) pathOrOptions.afterExecute(pathOrOptions.path);

            return result;
        })
    .fail(utils.rethrow('Error loading file: ' + pathOrOptions.path));

    function constructSource(source) {
        var pre = 'module.exports = (function(' + Object.keys(pathOrOptions.args).join(', ') + ') { ';
        var post = '} )';

        if (pathOrOptions.withArg && pathOrOptions.args[pathOrOptions.withArg]) {
            pre += 'with (' + pathOrOptions.withArg + ') {';
            post = '} ' + post;
        }
        post = '\n' + post;

        return pre + source + post;
    }

    function debugPath() {
        return pathOrOptions.debugPath ?
            ('http://' + (pathOrOptions.debugDomain ? pathOrOptions.debugDomain + '/' : '') + pathOrOptions.debugPath).replace(/\\/g, '/') :
            pathOrOptions.path;
    }

    function extendArgs() {
        pathOrOptions.args = _.extend({
            // __dirname and __filename resolve to the path that we pass to module._compile. 
            // Given this is our debug path, override these values with the true value.
            __filename: pathOrOptions.path,
            __dirname: path.dirname(pathOrOptions.path)
        }, pathOrOptions.args);
    }
}

function enumerateFiles(directoryPath, callback, recursive) {
    directoryPath = path.normalize(directoryPath);
    return fs.listTree(directoryPath, guard)
        .then(function (filePaths) {
            var promises = _.map(filePaths, function (filePath) {
                filePath = path.normalize(filePath);
                return callback(filePath, filePath.replace(directoryPath, ''));
            });
            return q.all(promises);
        })
    .fail(utils.rethrow('Error enumerating directory: ' + directoryPath));

    function guard(path, stat) {
        if (stat.isDirectory())
            return recursive !== false ? false : null;
        return true;
    }
}

function loadDirectory(pathOrOptions) {
    pathOrOptions = normaliseOptions(pathOrOptions);
    return enumerateFiles(pathOrOptions.path, function (filePath, relativePath) {
        var options = _.extend({}, pathOrOptions, {
            path: filePath,
            debugPath: (pathOrOptions.debugPath || '') + path.normalize(filePath).replace(path.normalize(pathOrOptions.path), '').replace(/\\/g, '/')
        });
        return loadFile(options);
    });
}

function normaliseOptions(pathOrOptions) {
    var options = typeof (pathOrOptions) === "string" ?
        { path: pathOrOptions } :
        pathOrOptions;
    options.path = path.normalize(options.path);
    return options;
}