var fs = require('q-io/fs'),
    vm = require('vm'),
    q = require('q'),
    _ = require('underscore'),
    utils = require('tribe/utilities'),
    path = require('path'),
    Module = require('module');

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
        .fail(utils.rethrow('Error loading directory: ' + pathOrOptions.path));
}

function guard(path, stat) {
    return !stat.isDirectory();
}

function loadFile(pathOrOptions) {
    pathOrOptions = normaliseOptions(pathOrOptions);
    return fs.read(pathOrOptions.path)
        .then(function (source) {
            var args = provideModuleObjects(pathOrOptions.args, pathOrOptions.path);

            var pre = '(function(' + Object.keys(args).join(', ') + ') { ';
            var post = '} )';

            if (pathOrOptions.withArg && pathOrOptions.args[pathOrOptions.withArg]) {
                pre += 'with (' + pathOrOptions.withArg + ') {';
                post = '} ' + post;
            }

            var compiled = vm.runInNewContext(pre + source + post, pathOrOptions.global, 'http://' + pathOrOptions.debugDomain + '/' + pathOrOptions.debugPath);
            return compiled.apply(pathOrOptions.thisArg, _.values(args));
        })
        .fail(utils.rethrow('Error loading file: ' + pathOrOptions.path));
}

function provideModuleObjects(args, filePath) {
    var fakeModule = new Module(filePath, module);
    fakeModule.paths = Module._nodeModulePaths(path.dirname(filePath));

    function loadModule(request) {
        return Module._load(request, fakeModule);
    }

    return _.extend({
        require: loadModule,
        __filename: path.resolve(filePath),
        __dirname: path.dirname(path.resolve(filePath))
    }, args);
}

function normaliseOptions(pathOrOptions) {
    return typeof(pathOrOptions) === "string" ?
        { path: pathOrOptions } :
        pathOrOptions;
}