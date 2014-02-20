resolve = function (path) {
    if (path.charAt(0) == '/')
        path = resolve.basePath + path;
    return require(path);
};
resolve.basePath = __dirname;