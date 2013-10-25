Tribe.PubSub.utils = {};
(function(utils) {
    utils.isArray = function (source) {
        return source.constructor === Array;
    };

    // these implementations from http://stackoverflow.com/questions/3362471/how-can-i-call-a-javascript-constructor-using-call-or-apply
    
    // far simpler, but doesn't support IE8.
    //utils.applyToConstructor = function(constructor, argArray) {
    //    var args = [null].concat(argArray);
    //    var factoryFunction = constructor.bind.apply(constructor, args);
    //    return new factoryFunction();
    //};

    // this does not support Date
    utils.applyToConstructor = function(Constructor, args) {
        var Temp = function() {
        }, // temporary constructor
            inst, ret; // other vars

        // Give the Temp constructor the Constructor's prototype
        Temp.prototype = Constructor.prototype;

        // Create a new instance
        inst = new Temp;

        // Call the original Constructor with the temp
        // instance as its context (i.e. its 'this' value)
        ret = Constructor.apply(inst, args);

        // If an object has been returned then return it otherwise
        // return the original instance.
        // (consistent with behaviour of the new operator)
        return Object(ret) === ret ? ret : inst;
    };

    // The following functions are taken from the underscore library, duplicated to avoid dependency. Licensing at http://underscorejs.org.
    var nativeForEach = Array.prototype.forEach;
    var nativeMap = Array.prototype.map;
    var breaker = {};

    utils.each = function (obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker) return;
                }
            }
        }
    };

    utils.map = function (obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        utils.each(obj, function (value, index, list) {
            results[results.length] = iterator.call(context, value, index, list);
        });
        return results;
    };
})(Tribe.PubSub.utils);
