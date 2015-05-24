var Module = require('module'),
    _ = require('underscore'),
    path = require('path'),
    utils = require('tribe/utilities'),
    originalLoader = Module._load,
    filters,
    stubbed,
    loaded;

module.exports = {
    enable: function () {
        stubbed = {};
        loaded = [];
        filters = [];
        var loader = Module._load = function (request, parent, isMain) {
            if (stubbed[request])
                return stubbed[request];

            if(_.any(filters, match)) {
                // if this is the first time we've loaded a module, ensure it is refreshed
                var modulePath = Module._resolveFilename(request, parent);

                if (loaded.indexOf(modulePath) === -1) {
                    clearCache(modulePath);
                    loaded.push(modulePath);
                }
            }

            return originalLoader(request, parent, isMain);

            function match(filter) {
                if(!filter)
                    return true;
                if (typeof filter === 'string')
                    return filter === request;
                if (filter.constructor === RegExp)
                    return filter.exec(request) !== null;
                if (typeof filter === 'function')
                    return filter(request);
                return false;
            }
        };
    },
    refresh: function (filter) {
        filters.push(filter);
    },
    refreshAll: function () {
        filters.push(null);
    },
    disable: function () {
        Module._load = originalLoader;
        stubbed = {};
        loaded = [];
        filters = [];
    },
    stub: function (request, target) {
        return stubbed[request] = target;
    }
};

function clearCache(path) {
    delete require.cache[fixPath(path)];
    delete require.cache[fixPath(path, true)];
}

function fixPath(path, lower) {
    // sometimes sources of paths return the drive letter in lower case, sometimes upper. Enumerating the cache to find the module is too slow.
    if (path.charAt(1) === ':')
        return (lower ? path.charAt(0).toLowerCase() : path.charAt(0).toUpperCase()) + path.substring(1);
    return path;
}
