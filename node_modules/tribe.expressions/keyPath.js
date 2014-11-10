module.exports = function (path, target) {
    if (!target) return;
    var index = path.indexOf('.');
    return index === -1
        ? target[path]
        : module.exports(path.substring(index + 1), target[path.substring(0, index)]);
};