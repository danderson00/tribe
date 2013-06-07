(function () {
    var utils = TC.Utils;

    utils.getPaneOptions = function(value, otherOptions) {
        var options = value.constructor === String ? { path: value } : value;
        return $.extend({}, otherOptions, options);
    };
})();
