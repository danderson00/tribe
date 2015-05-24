module.exports = function (path, target) {
    if (!target) return;
    var index = path.indexOf('.');
    return index === -1
        ? target[path]
        : module.exports(path.substring(index + 1), target[path.substring(0, index)]);
};

module.exports.set = function (path, target, value) {
    if (!target) return;
    var index = path.indexOf('.');
    if(index === -1)
        target[path] = value;
    else {
        var targetProperty = path.substring(0, index),
            remainder = path.substring(index + 1),
            targetObject = target[targetProperty];

        if (!targetObject || typeof targetObject !== 'object') {
            targetObject = {};
            target[targetProperty] = targetObject;
        }

        module.exports.set(remainder, targetObject, value);
    }
}