module.exports = {
    isEquivalentTo: function (source, target) {
        if (source.constructor === Array)
            return source.length === target.length && isArraySubsetOf(source, target);
        return Object.keys(source).length === Object.keys(target).length && isObjectSubsetOf(source, target);
    },
    isSubsetOf: function (source, target) {
        if (source.constructor === Array)
            return isArraySubsetOf(source, target);
        return isObjectSubsetOf(source, target);
    },
    isSupersetOf: function (source, target) {
        return module.exports.isSubsetOf(target, source);
    }
}

function isObjectSubsetOf(source, target) {
    for (var property in source)
        if (source.hasOwnProperty(property))
            if (source[property] !== target[property])
                return false;
    return true;
}

function isArraySubsetOf(source, target) {
    for (var i = 0, l = source.length; i < l; i++)
        if (target.indexOf(source[i]) === -1)
            return false;

    return true;
}