﻿module.exports = function (api) {
    var actor = require('tribe.pubsub/actor');

    actor.prototype.isDistributed = function () {
        this.metadata.isDistributed = true;
    };

    actor.prototype.requires = function (path) {
        if (path.charAt(0) !== '/')
            path = '/' + path;

        // this is not ideal...
        if (this.scope)
            // if we've got an id, we're creating a real actor and we have previously created dependencies for this actor, just return it
            return this.dependencies[path];
        else {
            // if we don't have an id, we're simply capturing the actor's metadata. store the dependency path and return an "empty" actor
            this.metadata.dependencies = this.metadata.dependencies || [];
            this.metadata.dependencies.push(path);
            return api.create(this.pubsub, path).instance;
        }
    };
}