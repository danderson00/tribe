var options = require('tribe/options'),
    path = require('path');

var paths = module.exports = {
    appPath: function (basePath) {
        return {
            resolve: function (targetPath) {
                return path.resolve(basePath, paths.removeLeadingSlash(targetPath));
            },
            'for': function (fullPath) {
                return fullPath.replace(basePath, '').replace(/\\/g, '/');
            },
            resourcePathFor: function (fullPath, resourceFolder) {
                var appPath = this['for'](fullPath);
                return paths.ensureLeadingSlash(appPath.substring(resourceFolder ? resourceFolder.length + 1 : 0, appPath.lastIndexOf('.')));
            }
        };
    },
    markupIdentifierFor: function (path, type) {
        return (type + '-' + path).replace(/\//g, '-').replace(/\./g, '');
    },
    ensureLeadingSlash: function (path) {
        if (path.charAt(0) !== '/')
            return '/' + path;
        return path;
    },
    removeLeadingSlash: function (path) {
        if (path.charAt(0) === '/')
            return path.substring(1);
        return path;
    },
    locatedIn: function (parent, child) {
        return path.resolve(child).toLowerCase().indexOf(path.resolve(parent).toLowerCase() + path.sep) === 0;
    }
};

