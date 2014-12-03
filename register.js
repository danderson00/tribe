﻿var actors = require('tribe/actors'),
    services = require('tribe/server/services'),
    context = {};

module.exports = {
    setContextPath: function (path, relative) {
        context = { path: path, relative: relative };
    },
    actor: function (constructor, path) {
        // if anyone uses a different extension, this will fail...
        path = path || context.relative.replace(/\\/g, '/').replace('.js', '');
        actors.register(path, constructor);
    },
    service: services.register,
    model: function () { }
};