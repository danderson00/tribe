﻿var utils = require('tribe/utilities'),
    _ = require('underscore'),
    fs = require('q-io/fs'),
    Q = require('q');

module.exports = function (property, path, filter, includeContent, recursive) {
    return function (context, build) {
        context[property] = context[property] || [];

        return utils.files.listTree(build.appPath.resolve(path), filter, recursive).then(function (files) {
            return Q.all(_.map(files, loadFile));
        });

        function loadFile(filePath) {
            var file = {
                path: filePath,
                appPath: build.appPath.for(filePath),
                resourcePath: build.appPath.resourcePathFor(filePath, path),
            };

            if (includeContent !== false)
                return fs.read(filePath).then(function (content) {
                    file.content = utils.files.stripBOM(content);
                    context[property].push(file);
                });
            else
                context[property].push(file);
        }
    };
};