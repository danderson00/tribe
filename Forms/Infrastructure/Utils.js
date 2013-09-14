TF = window.TF || {};
TF.Utils = {};

TF.Utils.normaliseBindings = function (valueAccessor, allBindingsAccessor) {
    var data = allBindingsAccessor();
    data.value = valueAccessor();
    if (!ko.isObservable(data.value) && $.isFunction(data.value))
        data.value = data.value();
    return data;
};

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

TF.Utils.cloneData = function (from, except) {
    var result = {};
    for (var property in from) {
        var value = from[property];
        if (from.hasOwnProperty(property) &&
            (!except || Array.prototype.indexOf.call(arguments, property) === -1) &&
            (!value || (value.constructor !== Function || ko.isObservable(value))))

            result[property] = ko.utils.unwrapObservable(value);
    }
    return result;
};