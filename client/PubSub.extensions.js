﻿var hub = require('./hub'),
    actors = require('tribe/actors'),
    scopes = require('./scopes'),
    pubsub = require('tribe.pubsub/pubsub'),
    lifetime = require('tribe.pubsub/lifetime'),
    expressions = require('tribe.expressions'),
    Q = require('q');

pubsub.prototype.obtainActor = function (path, scope) {
    var self = this,
        definition = actors.definition(path),
        actor;

    if (!definition)
        throw new Error("Requested actor '" + path + "' has not been registered");

    if(scope && typeof scope !== "object")
        scope = createScopeFromScalar(definition.scope, scope);

    return loadDependencies(this, definition, scope)
        .then(function (dependencies) {
            actor = actors.create(self, path, scope, dependencies);
            if (actor.metadata.isDistributed)
                return scopes.request(scope);
        })
        .then(function (data) {
            if(data && data.envelopes)
                actor.replay(data.envelopes);
            return actor.start().instance;
        });
};

function createScopeFromScalar(definition, scopeValue) {
    var scope = {};
    for(var i = 0, l = definition.length; i < l; i++)
        scope[definition[i]] = scopeValue;
    return scope;
}

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

pubsub.prototype.releaseActor = function (actorOrScope) {
    scopes.release(actorOrScope.__actor ? actorOrScope.__actor.scope : actorOrScope);
}

lifetime.prototype.obtainActor = pubsub.prototype.obtainActor;
lifetime.prototype.releaseActor = pubsub.prototype.releaseActor;


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
