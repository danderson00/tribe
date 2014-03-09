var Module = require('module'),
    _ = require('underscore'),
    originalLoader = Module._load,
    stubbed,
    loaded;

module.exports = {
    enable: function () {
        stubbed = {};
        mocked = {};
        loaded = [];
        var loader = Module._load = function (request, parent, isMain) {
            if (stubbed[request])
                return stubbed[request];

            // if this is the first time we've loaded a module, ensure it is refreshed
            var modulePath = Module._resolveFilename(request, parent);
            if (loaded.indexOf(modulePath) === -1) {
                clearCache(modulePath);
                loaded.push(modulePath);
            }

            var loadedModule = originalLoader(request, parent, isMain);
            return mocked[request] ?
                sinon.mock(loadedModule) :
                loadedModule;
        };
    },
    disable: function () {
        Module._load = originalLoader;
        stubbed = {};
        mocked = {};
        loaded = [];
    },
    stub: function (request, target) {
        return stubbed[request] = target;
    }
};

function clearCache(path) {
    // sometimes there seem to be case differences on the drive letter on windows. NFI.
    _.each(_.keys(require.cache), function (cachePath) {
        if (path.toUpperCase() === cachePath.toUpperCase())
            delete require.cache[cachePath];
    });
}