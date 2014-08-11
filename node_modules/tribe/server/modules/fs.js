var express = require('express'),
    path = require('path'),
    fs = require('q-io/fs');

module.exports = function (targetPath, sourcePath) {
    return {
        http: function (app) {
            app.use(targetPath, express.static(sourcePath));
        },
        'static': function (outputPath) {
            var fullOutputPath = path.resolve(outputPath + targetPath);
            return fs.makeTree(fullOutputPath)
                .then(function () {
                    return fs.copyTree(sourcePath, fullOutputPath);
                });
        }
    };
};
