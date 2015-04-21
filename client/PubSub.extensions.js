var hub = require('./hub'),
    actors = require('tribe/actors'),
    scopes = require('./scopes'),
    pubsub = require('tribe.pubsub/pubsub'),
    lifetime = require('tribe.pubsub/lifetime'),
    Q = require('q');

pubsub.prototype.obtainActor = function (path, scope) {
    var self = this,
        definition = actors.definition(path),
        actor;

    if (!definition)
        throw new Error("Requested actor '" + path + "' has not been registered");

    return loadDependencies(this, definition, scope)
        .then(function (dependencies) {
            actor = actors.create(self, path, scope, dependencies);
            if (actor.metadata.isDistributed)
                //return attachToHub(path, actor, true)
                return scopes.request(scope);
        })
        .then(function (data) {
            if(data && data.envelopes)
                actor.replay(data.envelopes);
            return actor.start().instance;
        });
};

function loadDependencies(pubsub, definition, scope) {
    var dependencies = {};

    if (!definition.dependencies) return Q();

    var promises = $.map(definition.dependencies, function (dependency) {
        return pubsub.obtainActor(dependency, scope).then(function (instance) {
            dependencies[dependency] = instance;
        });
    });

    return Q.all(promises).then(function () {
        return dependencies;
    });
}

lifetime.prototype.obtainActor = pubsub.prototype.obtainActor;


// deprecated. only used by test-studio
pubsub.prototype.startActor = function (path, scope, options) {
    options = options || {};

    var actor = actors.create(this, path, scope);

    if (actor.metadata.isDistributed && options.local !== true)
        attachToHub(path, actor, false);

    return actor.start(options.data);

    function attachToHub(path, actor, replay) {
        actor.pubsub.subscribe(actor.topics, function (message, envelope) {
            hub.publish(envelope);
        }, actor.metadata.expression);
        return hub.actor({ actor: path, scope: actor.scope, replay: replay });
    }
};

lifetime.prototype.startActor = pubsub.prototype.startActor;
