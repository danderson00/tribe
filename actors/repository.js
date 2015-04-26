var pubsub = require('tribe.pubsub'),
    actorModule = require('tribe.pubsub/actor'),
    log = require('tribe.logger'),
    _ = require('underscore');

var definitions = {},
    api = module.exports = {
        actors: {},
        actor: function (path) {
            return api.actors[normalisePath(path)];
        },
        register: function (path, constructor) {
            path = normalisePath(path);
            try {
                api.actors[path] = {
                    path: path,
                    constructor: constructor
                };
                log.debug('Registered actor ' + path);
            } catch (ex) {
                log.error('Unable to register actor ' + path, ex);
            }
        },
        definition: function (path) {
            // we need to lazily extract actor definitions to ensure all have been registered before creating an instance
            // just in case an actor "requires" another actor
            path = normalisePath(path);
            if (!definitions[path] && api.actors[path])
                definitions[path] = extractDefinition(path, api.actors[path].constructor);
            return definitions[path];
        }
    };

function extractDefinition(path, constructor) {
    var actor = new actorModule(pubsub, constructor);
    return {
        path: path,
        expression: actor.metadata.expression,
        isDistributed: actor.metadata.isDistributed,
        topics: _.keys(actor.handles),
        dependencies: actor.metadata.dependencies,
        scope: actor.metadata.scope
    };
}

function normalisePath(path) {
    return path.charAt(0) !== '/'
        ? '/' + path
        : path;
}
