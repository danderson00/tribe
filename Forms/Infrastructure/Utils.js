TF.Utils = {};

TF.Utils.evaluateProperty = function (target, property, defaultValue) {
    var properties = property.match(/[^\.]+/g);
    var result = target;

    if (properties) {
        for (var i = 0, l = properties.length; i < l; i++) {
            var current = result[properties[i]];
            if (current)
                result = current;
            else if (defaultValue) {
                result[properties[i]] = i < (l - 1) ? {} : defaultValue;
                result = result[properties[i]];
            } else
                return undefined;
        }
    }
    return result;
};

