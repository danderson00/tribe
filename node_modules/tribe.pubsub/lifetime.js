var channel = require('./channel'),
    actor = require('./actor'),
    utils = require('./utils');

var lifetime = module.exports = function (parent, owner, additionalProperties) {
    var self = this,
        tokens = [],
        active = true;

    this.owner = owner;

    this.publish = function (topicOrEnvelope, data) {
        if(active)
            return parent.publish(createEnvelope(topicOrEnvelope, data));
    };

    this.publishSync = function(topic, data) {
        if (active)
            return parent.publishSync(createEnvelope(topic, data));
    };

    this.subscribe = function (topic, func, expression) {
        var token = parent.subscribe(topic, func, expression);
        return recordToken(token);
    };

    this.subscribeOnce = function(topic, func) {
        var token = parent.subscribeOnce(topic, func);
        return recordToken(token);
    };
    
    this.unsubscribe = function(token) {
        // we should really remove the token(s) from our token list, but it has trivial impact if we don't
        return parent.unsubscribe(token);
    };

    this.end = function() {
        return parent.unsubscribe(tokens);
    };

    this.createLifetime = function (additionalProperties) {
        return new lifetime(self, self.owner, additionalProperties);
    };

    this.suspend = function () {
        active = false;
    };

    this.resume = function () {
        active = true;
    };
    
    function recordToken(token) {
        if (utils.isArray(token))
            tokens = tokens.concat(token);
        else
            tokens.push(token);
        return token;
    }

    function createEnvelope(topicOrEnvelope, data) {
        var envelope = topicOrEnvelope && topicOrEnvelope.topic
            ? topicOrEnvelope
            : { topic: topicOrEnvelope, data: data };

        for (var property in additionalProperties)
            if (additionalProperties.hasOwnProperty(property))
                envelope[property] = additionalProperties[property];

        return envelope;
    }
};

lifetime.prototype.startActor = function (definition, data) {
    return new actor(this, definition).start(data);
};

lifetime.prototype.channel = function (channelId) {
    return new channel(this, channelId);
};

