TC.Types.Models = function () { };

TC.Types.Models.prototype.register = function (resourcePath, constructor, options) {
    this[resourcePath] = {
        constructor: constructor,
        options: options || {}
    };
    TC.logger.debug("Model loaded for " + resourcePath);
};