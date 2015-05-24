var Q = require('q'),
    fs = require('q-io/fs'),
    path = require('path'),
    _ = require('underscore'),
    collections = {};

var api = module.exports = function (targetPath, collection) {
    return {
        http: function (app) {
            app.use(targetPath, function (req, res) {
                var folder = collections[collection],
                    filename = req.path.substring(req.path.lastIndexOf('/') + 1);

                if (folder && folder[filename])
                    res.type(req.path.substring(req.path.lastIndexOf('.'))).send(folder[filename]).end();
                else
                    res.status(404).send('Not found.').end();
            });
        },
        'static': function (outputPath) {
            var fullOutputPath = path.resolve(outputPath + targetPath);
            return fs.makeTree(fullOutputPath)
                .then(function () {
                    return Q.all(_.map(collections[collection], function (content, filename) {
                        return fs.write(path.resolve(fullOutputPath, filename), content);
                    }));
                });
        }
    };
};

api.mapFile = function (targetPath, collectionName, file) {
    return {
        http: function (app) {
            app.all(targetPath, function (req, res) {
                var content = getContent((req.useragent.isMobile || req.query.m !== undefined));

                if (content)
                    res.type(file.substring(file.lastIndexOf('.'))).send(content).end();
                else
                    res.status(404).send('Not found.').end();
            });
        },
        'static': function (outputPath, mobile) {
            var fullOutputPath = path.resolve(outputPath + targetPath),
                filePath = path.resolve(fullOutputPath, file);

            return fs.makeTree(fullOutputPath)
                .then(function () {
                    return fs.write(filePath, getContent(mobile));
                });
        }
    };

    function getContent(mobile) {
        var extensionStart = file.lastIndexOf('.'),
            mobileFile = file.substring(0, extensionStart) + '.mobile' + file.substring(extensionStart),
            collection = collections[collectionName],
            content;

        if (collection) {
            if (mobile && collection[mobileFile])
                content = collection[mobileFile];
            else
                content = collection[file];
        }

        return content;
    }
};

api.register = function (name, files) {
    collections[name] = files;
};

api.collections = collections;