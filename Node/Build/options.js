var utils = resolve('/utilities'),
    _ = resolve('underscore');

module.exports = {
    apply: function (options) {
        _.extend(module.exports, options);
        return module.exports;
    },
    port: 1678,
    basePath: utils.defaultBasePath(),
    dataPath: utils.defaultBasePath() + 'Data/'
};
