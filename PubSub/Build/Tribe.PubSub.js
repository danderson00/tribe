
// Source/PubSub.js

if (typeof (Tribe) === 'undefined')
    Tribe = {};

Tribe.PubSub = function (options) {
    var self = this;
    var utils = Tribe.PubSub.utils;

    this.owner = this;
    this.options = options || {};
    this.sync = option('sync');
     
    var subscribers = new Tribe.PubSub.SubscriberList();
    this.subscribers = subscribers;

    function publish(envelope) {
        var messageSubscribers = subscribers.get(envelope.topic);
        var sync = envelope.sync === true || self.sync === true;

        for (var i = 0, l = messageSubscribers.length; i < l; i++) {
            if (sync)
                executeSubscriber(messageSubscribers[i].handler);
            else {
                (function (subscriber) {
                    setTimeout(function () {
                        executeSubscriber(subscriber.handler);
                    });
                })(messageSubscribers[i]);
            }
        }

        function executeSubscriber(func) {
            var exceptionHandler = option('exceptionHandler');
            
            if(option('handleExceptions')  && exceptionHandler)
                try {
                    func(envelope.data, envelope);
                } catch (e) {
                    exceptionHandler(e, envelope);
                }
            else
                func(envelope.data, envelope);
        }
    }

    this.publish = function (topicOrEnvelope, data) {
        return publish(createEnvelope(topicOrEnvelope, data));
    };

    this.publishSync = function (topicOrEnvelope, data) {
        var envelope = createEnvelope(topicOrEnvelope, data);
        envelope.sync = true;
        return publish(envelope);
    };
    
    function createEnvelope(topicOrEnvelope, data) {
        return topicOrEnvelope && topicOrEnvelope.topic
            ? topicOrEnvelope
            : { topic: topicOrEnvelope, data: data };
    }

    this.subscribe = function (topic, func) {
        if (typeof (topic) === "string")
            return subscribers.add(topic, func);
        else if (utils.isArray(topic))
            return utils.map(topic, function(topicName) {
                return subscribers.add(topicName, func);
            });
        else
            return utils.map(topic, function (individualFunc, topicName) {
                return subscribers.add(topicName, individualFunc);
            });
    };

    this.unsubscribe = function (tokens) {
        if (Tribe.PubSub.utils.isArray(tokens)) {
            var results = [];
            for (var i = 0, l = tokens.length; i < l; i++)
                results.push(subscribers.remove(tokens[i]));
            return results;
        }

        return subscribers.remove(tokens);
    };

    this.createLifetime = function() {
        return new Tribe.PubSub.Lifetime(self, self);
    };

    this.channel = function(channelId) {
        return new Tribe.PubSub.Channel(self, channelId);
    };
    
    function option(name) {
        return (self.options.hasOwnProperty(name)) ? self.options[name] : Tribe.PubSub.options[name];
    }
};


// Source/Channel.js

Tribe.PubSub.Channel = function (pubsub, channelId) {
    var self = this;
    pubsub = pubsub.createLifetime();

    this.id = channelId;
    this.owner = pubsub.owner;

    this.publish = function (topicOrEnvelope, data) {
        return pubsub.publish(createEnvelope(topicOrEnvelope, data));
    };

    this.publishSync = function (topicOrEnvelope, data) {
        return pubsub.publishSync(createEnvelope(topicOrEnvelope, data));
    };

    this.subscribe = function(topic, func) {
        return pubsub.subscribe(topic, filterMessages(func));
    };

    this.subscribeOnce = function(topic, func) {
        return pubsub.subscribeOnce(topic, filterMessages(func));
    };
    
    this.unsubscribe = function(token) {
        return pubsub.unsubscribe(token);
    };

    this.end = function() {
        return pubsub.end();
    };

    this.createLifetime = function () {
        return new Tribe.PubSub.Lifetime(self, self.owner);
    };

    function createEnvelope(topicOrEnvelope, data) {
        var envelope = topicOrEnvelope && topicOrEnvelope.topic
          ? topicOrEnvelope
          : { topic: topicOrEnvelope, data: data };
        envelope.channelId = channelId;
        return envelope;
    }
    
    function filterMessages(func) {
        return function(data, envelope) {
            if (envelope.channelId === channelId)
                func(data, envelope);
        };
    }
};


// Source/Lifetime.js

Tribe.PubSub.Lifetime = function (parent, owner) {
    var self = this;
    var tokens = [];

    this.owner = owner;

    this.publish = function(topicOrEnvelope, data) {
        return parent.publish(topicOrEnvelope, data);
    };

    this.publishSync = function(topic, data) {
        return parent.publishSync(topic, data);
    };

    this.subscribe = function(topic, func) {
        var token = parent.subscribe(topic, func);
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

    this.channel = function(channelId) {
        return new Tribe.PubSub.Channel(self, channelId);
    };

    this.end = function() {
        return parent.unsubscribe(tokens);
    };

    this.createLifetime = function() {
        return new Tribe.PubSub.Lifetime(self, self.owner);
    };
    
    function recordToken(token) {
        if (Tribe.PubSub.utils.isArray(token))
            tokens = tokens.concat(token);
        else
            tokens.push(token);
        return token;
    }
};


// Source/options.js

Tribe.PubSub.options = {
    sync: false,
    handleExceptions: true,
    exceptionHandler: function(e, envelope) {
        typeof(console) !== 'undefined' && console.log("Exception occurred in subscriber to '" + envelope.topic + "': " + Tribe.PubSub.utils.errorDetails(e));
    }
};


// Source/subscribeOnce.js

Tribe.PubSub.prototype.subscribeOnce = function (topic, handler) {
    var self = this;
    var utils = Tribe.PubSub.utils;
    var lifetime = this.createLifetime();

    if (typeof (topic) === "string")
        return lifetime.subscribe(topic, wrapHandler(handler));
    else if (utils.isArray(topic))
        return lifetime.subscribe(wrapTopicArray());
    else
        return lifetime.subscribe(wrapTopicObject());

    function wrapTopicArray() {
        var result = {};
        utils.each(topic, function(topicName) {
            result[topicName] = wrapHandler(handler);
        });
        return result;
    }
    
    function wrapTopicObject() {
        return utils.map(topic, function (func, topicName) {
            return lifetime.subscribe(topicName, wrapHandler(func));
        });
    }

    function wrapHandler(func) {
        return function() {
            lifetime.end();
            func.apply(self, arguments);
        };
    }
};


// Source/SubscriberList.js

Tribe.PubSub.SubscriberList = function() {
    var subscribers = {};
    var lastUid = -1;

    this.get = function (publishedTopic) {
        var matching = [];
        for (var registeredTopic in subscribers)
            if (subscribers.hasOwnProperty(registeredTopic) && topicMatches(publishedTopic, registeredTopic))
                matching = matching.concat(subscribers[registeredTopic]);
        return matching;
    };

    this.add = function (topic, handler) {
        var token = (++lastUid).toString();
        if (!subscribers.hasOwnProperty(topic))
            subscribers[topic] = [];
        subscribers[topic].push({ topic: topic, handler: handler, token: token });
        return token;
    };

    this.remove = function(token) {
        for (var m in subscribers)
            if (subscribers.hasOwnProperty(m))
                for (var i = 0, l = subscribers[m].length; i < l; i++)
                    if (subscribers[m][i].token === token) {
                        subscribers[m].splice(i, 1);
                        return token;
                    }

        return false;
    };

    function topicMatches(published, subscriber) {
        if (subscriber === '*')
            return true;
        
        var expression = "^" + subscriber
            .replace(/\./g, "\\.")
            .replace(/\*/g, "[^\.]*") + "$";
        return published.match(expression);
    }
};


// Source/utils.js

Tribe.PubSub.utils = {};
(function(utils) {
    utils.isArray = function (source) {
        return source.constructor === Array;
    };

    // The following functions are taken from the underscore library, duplicated to avoid dependency. License at http://underscorejs.org.
    var nativeForEach = Array.prototype.forEach;
    var nativeMap = Array.prototype.map;
    var breaker = {};

    utils.each = function (obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker) return;
                }
            }
        }
    };

    utils.map = function (obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        utils.each(obj, function (value, index, list) {
            results[results.length] = iterator.call(context, value, index, list);
        });
        return results;
    };

    utils.copyProperties = function (source, target, properties) {
        for (var i = 0, l = properties.length; i < l; i++) {
            var property = properties[i];
            if(source.hasOwnProperty(property))
                target[property] = source[property];
        }
    };

    utils.errorDetails = function (ex) {
        if (!ex) return '';
        return (ex.constructor === String) ? ex :
            (ex.stack || '') + (ex.inner ? '\n\n' + utils.errorDetails(ex.inner) : '\n');
    };
})(Tribe.PubSub.utils);



// Source/Actor.core.js

(function () {
    var utils = Tribe.PubSub.utils;

    Tribe.PubSub.Actor = function (pubsub, definition) {
        var self = this;

        pubsub = pubsub.createLifetime();
        this.pubsub = pubsub;
        this.children = [];

        configureActor();
        this.handles = this.handles || {};

        // TODO: this is not ie<9 compatible and includes onstart / onend
        this.topics = Object.keys(this.handles);

        function configureActor() {
            if (definition)
                if (definition.constructor === Function)
                    definition(self);
                else
                    Tribe.PubSub.utils.copyProperties(definition, self, ['handles', 'endsChildrenExplicitly', 'onstart', 'onresume', 'onsuspend', 'onend']);
        }
    };

    Tribe.PubSub.Actor.prototype.start = function (startData) {
        utils.each(this.handles, this.addHandler, this);
        if (this.onstart) this.onstart(startData, this);
        return this;
    };

    Tribe.PubSub.Actor.prototype.startChild = function (child, onstartData) {
        this.children.push(new Tribe.PubSub.Actor(this.pubsub, child)
            .start(onstartData));
        return this;
    };

    Tribe.PubSub.Actor.prototype.resume = function (data, resumeData) {
        utils.each(this.handles, this.addHandler, this);
        this.data = data;
        if (this.onresume) this.onresume(resumeData, this);
        return this;
    };

    Tribe.PubSub.Actor.prototype.suspend = function (suspendData) {
        if (this.onsuspend) this.onsuspend(suspendData, this);
        this.pubsub.end();
        this.suspendChildren(suspendData);
        return this;
    };

    Tribe.PubSub.Actor.prototype.end = function (endData) {
        if (this.onend) this.onend(endData, this);
        this.pubsub.end();
        this.endChildren(endData);
        return this;
    };

    Tribe.PubSub.Actor.prototype.endChildren = function (data) {
        Tribe.PubSub.utils.each(this.children, function (child) {
            child.end(data);
        });
    };
    
    Tribe.PubSub.Actor.prototype.suspendChildren = function (data) {
        Tribe.PubSub.utils.each(this.children, function (child) {
            child.suspend(data);
        });
    };

    Tribe.PubSub.Actor.startActor = function (definition, data) {
        return new Tribe.PubSub.Actor(this, definition).start(data);
    };

    Tribe.PubSub.prototype.startActor = Tribe.PubSub.Actor.startActor;
    Tribe.PubSub.Lifetime.prototype.startActor = Tribe.PubSub.Actor.startActor;
})();



// Source/Actor.handlers.js

Tribe.PubSub.Actor.prototype.addHandler = function (handler, topic) {
    var self = this;

    if (!handler)
        this.pubsub.subscribe(topic, endHandler());
    else if (handler.constructor === Function)
        this.pubsub.subscribe(topic, messageHandlerFor(handler));
    else
        this.pubsub.subscribe(topic, childHandlerFor(handler));

    function messageHandlerFor(handler) {
        return function (messageData, envelope) {
            if (!self.endsChildrenExplicitly)
                self.endChildren(messageData);

            if (self.preMessage) self.preMessage(envelope);
            handler(messageData, envelope, self);
            if (self.postMessage) self.postMessage(envelope);
        };
    }

    function childHandlerFor(childHandlers) {
        return function (messageData, envelope) {
            self.startChild({ handles: childHandlers }, messageData);
        };
    }

    function endHandler() {
        return function (messageData) {
            self.end(messageData);
        };
    }
};



// Source/exports.js

if (typeof(module) !== 'undefined')
    module.exports = new Tribe.PubSub();
