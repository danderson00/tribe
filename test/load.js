﻿var fs = require('q-io/fs'),
    vm = require('vm'),
    _ = require('underscore'),
    utils = require('tribe/utilities'),
    resources = require('tribe/utilities/files'),
    path = require('path'),
    Module = require('module');

module.exports = {
    file: loadFile,
    directory: loadDirectory
};

function loadFile(pathOrOptions) {
    var options = normaliseOptions(pathOrOptions);
    var fullPath = require.resolve(options.path);
    return fs.read(options.path)
        .then(function (source) {
            extendArgs();

            var fullPath = options.path[0].toLowerCase() + options.path.substring(1);

            var newModule = new Module(fullPath);
            newModule.id = fullPath;
            newModule.filename = newModule.id;
            newModule.paths = Module._nodeModulePaths(path.dirname(fullPath));
            newModule.parent = module;
            newModule._compile(constructSource(source), debugPath());

            if (options.beforeExecute) options.beforeExecute(fullPath);
            var result = newModule.exports.apply(options.thisArg, _.values(options.args));
            if (options.afterExecute) options.afterExecute(fullPath);

            return result;
        })
    .fail(utils.errors.rethrow('Error loading file: ' + options.path));

    function constructSource(source) {
        var pre = 'module.exports = (function(' + Object.keys(options.args).join(', ') + ') { extendRequire(require); ';
        var post = '} )';

        return pre + source + post;
    }

    function debugPath() {
        return options.debugPath ?
            ('http://' + (options.debugDomain ? options.debugDomain + '/' : '') + options.debugPath).replace(/\\/g, '/') :
            options.path;
    }

    function extendArgs() {
        options.args = _.extend({
            // __dirname and __filename resolve to the path that we pass to module._compile. 
            // Given this is our debug path, override these values with the true value.
            __filename: fullPath,
            __dirname: path.dirname(fullPath),
            //__filename: path.resolve(options.path),
            //__dirname: path.resolve(path.dirname(options.path)),
            extendRequire: extendRequire
        }, options.args);
    }

    function extendRequire(target) {
        _.extend(target, options.requireExtensions);
    }
}

function loadDirectory(pathOrOptions) {
    pathOrOptions = normaliseOptions(pathOrOptions);
    return resources.enumerateFiles(pathOrOptions.path, function (filePath, relativePath) {
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