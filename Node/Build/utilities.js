module.exports = {
    defaultBasePath: function () {
        var path = process.argv[1];
        return path.substr(0, path.replace(/\\/g, '/').lastIndexOf('/')) + '/';
    },

    ensureTrailingSlash: function (path) {
        return path.charAt(path.length - 1) === '/' ? path : path + '/';
    }
};