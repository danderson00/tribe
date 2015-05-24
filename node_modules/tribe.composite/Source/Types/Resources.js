T.Types.Resources = function () { };

T.Types.Resources.prototype.register = function (resourcePath, constructor, options) {
    this[resourcePath] = {
        constructor: constructor,
        options: options || {}
    };
    T.logger.debug("Model loaded for " + resourcePath);
};