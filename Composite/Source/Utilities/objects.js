TC.Utils.arguments = function (args) {
    var byConstructor = {};
    $.each(args, function (index, arg) {
        byConstructor[arg.constructor] = arg;
    });

    return {
        byConstructor: function (constructor) {
            return byConstructor(constructor);
        },
        object: byConstructor[Object],
        string: byConstructor[String],
        func: byConstructor[Function],
        array: byConstructor[Array],
        number: byConstructor[Number]
    };
};

TC.Utils.removeItem = function (array, item) {
    var index = $.inArray(item, array);
    if (index > -1)
        array.splice(index, 1);
};

TC.Utils.inheritOptions = function (from, to, options) {
    for (var i = 0, l = options.length; i < l; i++)
        to[options[i]] = from[options[i]];
    return to;
};

TC.Utils.cloneData = function (from, except) {
    if (!from) return;
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

TC.Utils.normaliseBindings = function (valueAccessor, allBindingsAccessor) {
    var data = allBindingsAccessor();
    data.value = valueAccessor();
    if (!ko.isObservable(data.value) && $.isFunction(data.value))
        data.value = data.value();
    return data;
};

