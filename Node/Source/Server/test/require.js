var m = require('module'),
    originalLoader = m._load,
    mocked,
    loaded;

module.exports = {
    enable: function () {
        mocked = {};
        loaded = [];
        var loader = m._load = function (request, parent, isMain) {
            if (mocked[request])
                return mocked[request];

            if (loaded.indexOf(request) === -1) {
                delete require.cache[require.resolve(request)];
                loaded.push(request);
            }

            return originalLoader(request, parent, isMain);
        };
    },
    disable: function () {
        m._load = originalLoader;
        for (var i = 0, l = loaded.length; i < l; i++)
            delete require.cache[require.resolve(loaded[i])];
        mocked = {};
        loaded = [];
    },
    mock: function (request, target) {
        mocked[request] = target;
    }
};