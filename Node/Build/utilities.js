module.exports = {
    ensureTrailingSlash: function (path) {
        return path.charAt(path.length - 1) === '/' ? path : path + '/';
    }
};