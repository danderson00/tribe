var actors = require('tribe/actors');

module.exports = {
    actor: function (constructor, path) {
        if (path || (T.scriptEnvironment && T.scriptEnvironment.resourcePath))
            actors.register(path || T.scriptEnvironment.resourcePath, constructor);
        else
            throw new Error('No path specified when registering actor');
    },
    model: T.registerModel,
    handler: function () {
        throw new Error("You can't register a static handler on the client (yet)!");
    },
    service: function () {
        throw new Error("You can't register a service on the client!");
    }
};