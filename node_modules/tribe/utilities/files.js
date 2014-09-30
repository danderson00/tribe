var options = require('tribe/options'),
    errors = require('tribe/utilities/errors'),
    fs = require('q-io/fs'),
    q = require('q'),
    path = require('path'),
    _ = require('underscore');

module.exports = {
    listTree: function (directoryPath, filter, recursive) {
        return fs.listTree(directoryPath, guard);

        function guard(path, stat) {
            if (stat.isDirectory())
                return (path.toUpperCase() === directoryPath.toUpperCase() || recursive !== false) ? false : null;
            return !filter || path.match(filter) !== null;
        }
    },
    enumerateFiles: function (directoryPath, callback, recursive) {
        var directoryPath = path.normalize(directoryPath);

        return module.exports.listTree(directoryPath, null, recursive)
            .then(function (filePaths) {
                var promises = _.map(filePaths, function (filePath) {
                    filePath = path.normalize(filePath);
                    return callback(filePath, filePath.replace(directoryPath, ''));
                });
                return q.all(promises);
            })
            .fail(errors.rethrow('Error enumerating directory: ' + directoryPath));
    },
    requireDirectory: function (directoryPath, recursive) {
        return module.exports.enumerateFiles(directoryPath, require, recursive);
    },
    stripBOM: function (content) {
        // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
        // because the buffer-to-string conversion in `fs.readFileSync()`
        // translates it to FEFF, the UTF-16 BOM.
        if (content.charCodeAt(0) === 0xFEFF) {
            content = content.slice(1);
        }
        return content;
    }
};