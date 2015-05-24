(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (handler, topic) {
    var self = this;

    if (!handler)
        this.pubsub.subscribe(topic, endHandler());
    else if (handler.constructor === Function)
        this.pubsub.subscribe(topic, messageHandlerFor(handler), this.metadata.expression);
    else
        this.pubsub.subscribe(topic, childHandlerFor(handler), this.metadata.expression);

    function messageHandlerFor(handler) {
        return function (messageData, envelope) {
            if (!self.endsChildrenExplicitly)
                self.endChildren(messageData);

            if (self.beforeMessage) self.beforeMessage(envelope);
            handler(messageData, envelope, self);
            if (self.afterMessage) self.afterMessage(envelope);
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

},{}],2:[function(require,module,exports){
var addHandler = require('./actor.addHandler'),
    utils = require('./utils');

var actor = module.exports = function (pubsub, definition, id, additionalProperties) {
    var self = this;

    pubsub = pubsub.createLifetime({ origin: 'actor' });
    this.pubsub = pubsub;
    this.children = [];
    this.id = id;
    this.metadata = {};

    attachProperties();
    configureActor();

    this.handles = this.handles || {};
    this.topics = utils.keys(this.handles);

    function configureActor() {
        if (definition)
            if (definition.constructor === Function)
                self.instance = new definition(self);
            else
                utils.copyProperties(definition, self, ['handles', 'endsChildrenExplicitly', 'onstart', 'onresume', 'onsuspend', 'onend']);
    }

    function attachProperties() {
        utils.each(additionalProperties, function (value, key) {
            self[key] = value;
        });
    }
};

actor.prototype.start = function (startData) {
    if (this.onstart) this.onstart(startData, this);
    utils.each(this.handles, this.addHandler, this);
    return this;
};

actor.prototype.startChild = function (child, onstartData) {
    this.children.push(new actor(this.pubsub, child)
        .start(onstartData));
    return this;
};

actor.prototype.resume = function (data, resumeData) {
    this.data = data;
    if (this.onresume) this.onresume(resumeData, this);
    utils.each(this.handles, this.addHandler, this);
    return this;
};

actor.prototype.suspend = function (suspendData) {
    if (this.onsuspend) this.onsuspend(suspendData, this);
    this.pubsub.end();
    this.suspendChildren(suspendData);
    return this;
};

actor.prototype.end = function (endData) {
    if (this.onend) this.onend(endData, this);
    this.pubsub.end();
    this.endChildren(endData);
    return this;
};

actor.prototype.endChildren = function (data) {
    utils.each(this.children, function (child) {
        child.end(data);
    });
};
    
actor.prototype.suspendChildren = function (data) {
    utils.each(this.children, function (child) {
        child.suspend(data);
    });
};

actor.prototype.isScopedTo = function (property) {
    this.metadata.expression = { p: 'data.' + property, v: this.id };
};

actor.prototype.replay = function (envelopes) {
    var self = this;
    self.pubsub.suspend();
    utils.each(envelopes, function (envelope) {
        if (self.handles[envelope.topic])
            self.handles[envelope.topic](envelope.data, envelope);
    });
    self.pubsub.resume();
};

actor.prototype.addHandler = addHandler;
},{"./actor.addHandler":1,"./utils":13}],3:[function(require,module,exports){
if (typeof Tribe === "undefined") Tribe = {};
Tribe.PubSub = require('./pubsub');
Tribe.PubSub.Actor = require('./actor');
},{"./actor":2,"./pubsub":9}],4:[function(require,module,exports){
module.exports = function (pubsub, channelId) {
    var self = this,
        lifetime = require('./lifetime');

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
        return new lifetime(self, self.owner);
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
},{"./lifetime":7}],5:[function(require,module,exports){
var utils = require('../utils');

module.exports = function (topic) {
    var handlers = {};

    return {
        add: function (handler, token) {
            handlers[token] = handler;
        },
        remove: function (token) {
            delete handlers[token];
        },
        get: function (envelope) {
            return utils.values(handlers);
        }
    };
};
},{"../utils":13}],6:[function(require,module,exports){
var utils = require('../utils'),
    expressions = require('tribe.expressions');

// this filter uses tribe.expressions and only supports the '=' expression

module.exports = function (topic) {
    var properties = {},
        tokens = {};

    return {
        add: function (handler, token, expression) {
            if (!properties[expression.p])
                properties[expression.p] = {};

            var property = properties[expression.p];
            if (!property[expression.v])
                property[expression.v] = {};

            property[expression.v][token] = handler;
            tokens[token] = expression;
        },
        remove: function (token) {
            var expression = tokens[token];
            if (expression) {
                delete properties[expression.p][expression.v][token];
                delete tokens[token];
            }
        },
        get: function (envelope) {
            if (!envelope.data)
                return [];

            var handlers = [];

            for (var property in properties)
                if (properties.hasOwnProperty(property)) {
                    var value = expressions.evaluateKeyPath(property, envelope);
                    //if(value !== undefined)
                        handlers = handlers.concat(utils.values(properties[property][value]));
                }

            return handlers;
        }
    };
};
},{"../utils":13,"tribe.expressions":15}],7:[function(require,module,exports){
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


},{"./actor":2,"./channel":4,"./utils":13}],8:[function(require,module,exports){
var utils = require('./utils');

module.exports = {
    sync: false,
    handleExceptions: true,
    exceptionHandler: function(e, envelope) {
        typeof(console) !== 'undefined' && console.log("Exception occurred in subscriber to '" + envelope.topic + "': " + utils.errorDetails(e));
    }
};
},{"./utils":13}],9:[function(require,module,exports){
var lifetime = require('./lifetime'),
    channel = require('./channel'),
    actor = require('./actor'),
    topicList = require('./topicList'),
    subscribeOnce = require('./subscribeOnce'),
    subscribeTo = require('./subscribeTo'),
    options = require('./options'),
    utils = require('./utils');

var pubsub = module.exports = function (instanceOptions) {
    var self = this;

    this.owner = this;
    this.options = instanceOptions || {};
    this.sync = option('sync');
     
    var subscribers = new topicList();
    this.subscribers = subscribers;

    function publish(envelope) {
        var messageSubscribers = subscribers.get(envelope);
        var sync = envelope.sync === true || self.sync === true;

        for (var i = 0, l = messageSubscribers.length; i < l; i++) {
            if (sync)
                executeSubscriber(messageSubscribers[i]);
            else {
                (function (subscriber) {
                    setTimeout(function () {
                        executeSubscriber(subscriber);
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

    this.subscribe = function (topic, func, expression) {
        if (typeof (topic) === "string")
            return subscribers.add(topic, func, expression);
        else if (utils.isArray(topic))
            return utils.map(topic, function(topicName) {
                return subscribers.add(topicName, func, expression);
            });
        else
            return utils.map(topic, function (individualFunc, topicName) {
                return subscribers.add(topicName, individualFunc, expression);
            });
    };

    this.subscribe.to = subscribeTo(this);

    this.unsubscribe = function (tokens) {
        if (utils.isArray(tokens)) {
            var results = [];
            for (var i = 0, l = tokens.length; i < l; i++)
                results.push(subscribers.remove(tokens[i]));
            return results;
        }

        return subscribers.remove(tokens);
    };

    this.createLifetime = function (additionalProperties) {
        return new lifetime(self, self, additionalProperties);
    };

    this.subscribeOnce = subscribeOnce;
    
    function option(name) {
        return (self.options.hasOwnProperty(name)) ? self.options[name] : options[name];
    }
};

pubsub.prototype.channel = function (channelId) {
    return new channel(this, channelId);
};

pubsub.prototype.startActor = function (definition, data) {
    return new actor(this, definition).start(data);
};

},{"./actor":2,"./channel":4,"./lifetime":7,"./options":8,"./subscribeOnce":10,"./subscribeTo":11,"./topicList":12,"./utils":13}],10:[function(require,module,exports){
module.exports = function (topic, handler) {
    var self = this;
    var utils = require('./utils');
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
},{"./utils":13}],11:[function(require,module,exports){
module.exports = function (pubsub) {
    return function (topic) {
        return {
            when: function (property) {
                return {
                    equals: function (value) {
                        return {
                            execute: function (func) {
                                return pubsub.subscribe(topic, func, { p: property, v: value });
                            }
                        }
                    }
                }
            },
            execute: function (func) {
                return pubsub.subscribe(topic, func);
            }
        };
    };
}
},{}],12:[function(require,module,exports){
var filterTypes = {
    'default': require('./filters/default'),
    'property': require('./filters/property')
};

module.exports = function () {
    var topics = {};
    var lastUid = -1;

    this.get = function (envelope) {
        var publishedTopic = envelope.topic,
            matching = [];

        for (var registeredTopic in topics)
            if (topics.hasOwnProperty(registeredTopic) && topicMatches(publishedTopic, registeredTopic))

                for (var filter in topics[registeredTopic])
                    if (topics[registeredTopic].hasOwnProperty(filter))
                        matching = matching.concat(topics[registeredTopic][filter].get(envelope));

        return matching;
    };

    this.add = function (topic, handler, expression) {
        var token = (++lastUid).toString(),
            filter = expression ? 'property' : 'default';

        if (!topics.hasOwnProperty(topic))
            topics[topic] = {};

        var filters = topics[topic];
        if (!filters[filter])
            filters[filter] = filterTypes[filter](topic);

        filters[filter].add(handler, token, expression);
        return token;
    };

    this.remove = function(token) {
        for (var topic in topics)
            if (topics.hasOwnProperty(topic))
                for (var filter in topics[topic])
                    if (topics[topic].hasOwnProperty(filter))
                        topics[topic][filter].remove(token);
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
},{"./filters/default":5,"./filters/property":6}],13:[function(require,module,exports){
var utils = module.exports = {};

utils.isArray = function (source) {
    return source.constructor === Array;
};

utils.copyProperties = function (source, target, properties) {
    for (var i = 0, l = properties.length; i < l; i++) {
        var property = properties[i];
        if (source.hasOwnProperty(property))
            target[property] = source[property];
    }
};

utils.errorDetails = function (ex) {
    if (!ex) return '';
    return (ex.constructor === String) ? ex :
        (ex.stack || '') + (ex.inner ? '\n\n' + utils.errorDetails(ex.inner) : '\n');
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

utils.keys = function (object) {
    var keys = [];
    for (var property in object)
        if (object.hasOwnProperty(property))
            keys.push(property);
    return keys;
};

utils.values = function (object) {
    var values = [];
    for (var property in object)
        if (object.hasOwnProperty(property))
            values.push(object[property]);
    return values;
};

},{}],14:[function(require,module,exports){
// Array.indexOf polyfill
require('./indexOf');

var keyPath = require('./keyPath');

module.exports = function (expression, target) {
    var value = keyPath(expression.p, target);
    switch (expression.o) {
        case undefined:
        case '=': return value === expression.v;
        case '!=': return value !== expression.v;
        case '<': return value < expression.v;
        case '<=': return value <= expression.v;
        case '>': return value > expression.v;
        case '>=': return value >= expression.v;
        case 'in': return expression.v.indexOf(value) > -1;
        case 'contains': return value.indexOf(expression.v) > -1;
    }
}
},{"./indexOf":16,"./keyPath":17}],15:[function(require,module,exports){
var keyPath = require('./keyPath'),
    evaluate = require('./evaluate');

module.exports = {
    evaluateKeyPath: keyPath,
    evaluate: evaluate
};
},{"./evaluate":14,"./keyPath":17}],16:[function(require,module,exports){
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
        'use strict';
        if (this == null) {
            throw new TypeError();
        }
        var n, k, t = Object(this),
            len = t.length >>> 0;

        if (len === 0) {
            return -1;
        }
        n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0) ; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}
},{}],17:[function(require,module,exports){
module.exports = function (path, target) {
    if (!target) return;
    var index = path.indexOf('.');
    return index === -1
        ? target[path]
        : module.exports(path.substring(index + 1), target[path.substring(0, index)]);
};
},{}]},{},[3]);
