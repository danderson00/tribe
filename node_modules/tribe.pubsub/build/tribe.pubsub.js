(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var keyPath = require('./keyPath');

module.exports = function (expression, values) {
    if (expression === undefined || expression === null
        || (expression.constructor === Array && expression.length === 0))
            return;

    if (expression.constructor === Array) {
        var result = [];
        for (var i = 0, l = expression.length; i < l; i++)
            result.push(applyExpressionValue(expression[i], values));
        return result;
    }

    return applyExpressionValue(expression, values);
};

function applyExpressionValue(expression, values) {
    var value = values;
    if (values && values.constructor === Object)
        value = values[expression.p]; //keyPath(expression.p, values);

    return { p: expression.p, o: expression.o, v: value };
}
},{"./keyPath":7}],2:[function(require,module,exports){
var flatten = require('tribe.functional/flatten');

module.exports = function(expressions) {
    // this exists in case it should be more sophisticated?
    return flatten(Array.prototype.slice.call(arguments));
};

},{"tribe.functional/flatten":8}],3:[function(require,module,exports){
module.exports = function (source, prepend) {
    var expression = [];
    for (var path in source)
        if (source.hasOwnProperty(path))
            expression.push({ p: (prepend ? prepend + '.' : '') + path, v: source[path] });
    return expression;
}
},{}],4:[function(require,module,exports){
// Array.indexOf polyfill
require('./indexOf');

var keyPath = require('./keyPath');

module.exports = function (expression, target) {
  if(expression.constructor === Array) {
      for(var i = 0, l = expression.length; i < l; i++)
          if(!evaluate(expression[i], target)) {
            return false;
          }
      return true;
  } else
      return evaluate(expression, target);
}

function evaluate(expression, target) {
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

},{"./indexOf":6,"./keyPath":7}],5:[function(require,module,exports){
var keyPath = require('./keyPath'),
    evaluate = require('./evaluate'),
    apply = require('./apply'),
    create = require('./create'),
    combine = require('./combine');

module.exports = {
    evaluateKeyPath: keyPath,
    setKeyPath: keyPath.set,
    evaluate: evaluate,
    apply: apply,
    create: create,
    combine: combine
};

},{"./apply":1,"./combine":2,"./create":3,"./evaluate":4,"./keyPath":7}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
module.exports = function (path, target) {
    if (!target) return;
    var index = path.indexOf('.');
    return index === -1
        ? target[path]
        : module.exports(path.substring(index + 1), target[path.substring(0, index)]);
};

module.exports.set = function (path, target, value) {
    if (!target) return;
    var index = path.indexOf('.');
    if(index === -1)
        target[path] = value;
    else {
        var targetProperty = path.substring(0, index),
            remainder = path.substring(index + 1),
            targetObject = target[targetProperty];

        if (!targetObject || typeof targetObject !== 'object') {
            targetObject = {};
            target[targetProperty] = targetObject;
        }

        module.exports.set(remainder, targetObject, value);
    }
}
},{}],8:[function(require,module,exports){
module.exports = function (target) {
    return target.reduce(function (result, item) {
        if(item === undefined || item === null) return result;
        return result.concat(item.constructor === Array ? module.exports(item) : item);
    }, []);
}

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
var addHandler = require('./actor.addHandler'),
    expressions = require('tribe.expressions'),
    utils = require('./utils');

var actor = module.exports = function (pubsub, definition, scope, dependencies) {
    var self = this;

    pubsub = pubsub.createLifetime(scope);
    this.pubsub = pubsub;
    this.children = [];
    this.scope = scope;
    this.metadata = {
        expression: [],
        scope: []
    };
    this.dependencies = dependencies;
    this.handlers = {};

    configureActor();

    this.topics = function () {
        return utils.keys(this.handlers);
    };

    function configureActor() {
        if (definition && definition.constructor === Function) {
            self.instance = new definition(self);
            self.instance.__actor = self;
        } else {
            //throw new Error("Actor definition must be a function");
            utils.copyProperties(definition, self, ['endsChildrenExplicitly', 'onstart', 'onresume', 'onsuspend', 'onend']);
            self.handlers = definition.handles;
        }
    }
};

actor.prototype.handles = function (topicOrHandlers, handler) {
    if(topicOrHandlers.constructor === String)
        this.handlers[topicOrHandlers] = handler;
    else
        utils.extend(this.handlers, topicOrHandlers);
};

actor.prototype.start = function (startData) {
    if (this.onstart) this.onstart(startData, this);
    utils.each(this.handlers, this.addHandler, this);
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
    utils.each(this.handlers, this.addHandler, this);
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
    var self = this;
    utils.each(arguments, function (arg) {
        var value = (self.scope && self.scope.constructor === Object)
            ? self.scope[arg]
            : self.scope;
        self.metadata.expression.push({ p: 'data.' + arg, v: value });
        self.metadata.scope.push(arg);
    });
};

actor.prototype.replay = function (envelopes) {
    var self = this;
    self.pubsub.suspend();
    utils.each(envelopes, function (envelope) {
        if (self.handlers[envelope.topic])
            self.handlers[envelope.topic](envelope.data, envelope);
    });
    self.pubsub.resume();
};

actor.prototype.addHandler = addHandler;

},{"./actor.addHandler":9,"./utils":21,"tribe.expressions":5}],11:[function(require,module,exports){
if (typeof Tribe === "undefined") Tribe = {};
Tribe.PubSub = require('./pubsub');
Tribe.PubSub.Actor = require('./actor');
},{"./actor":10,"./pubsub":17}],12:[function(require,module,exports){
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
},{"./lifetime":15}],13:[function(require,module,exports){
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
},{"../utils":21}],14:[function(require,module,exports){
var utils = require('../utils'),
    expressions = require('tribe.expressions');

// this filter uses tribe.expressions and only supports the '=' expression
// we are constructing a tree of expressions where each node contains either handlers or another filter
// some more explanation would probably be useful...
module.exports = function ExpressionFilter(topic) {
    var properties = {},
        tokens = {};

    this.add = function (handler, token, expression) {
        if (!expression) return [];
        if (expression.constructor !== Array) expression = [expression];
        if (expression.length == 0) return [];

        if(expression.length === 1)
            assignExpression(handler, token, expression[0]);
        else {
            var value = new module.exports(topic);
            value.add(handler, token, expression.slice(1));
            assignExpression(value, token, expression[0]);
        }
    };

    this.remove = function (token) {
        var expression = tokens[token];
        if (expression) {
            delete properties[expression.p][expression.v][token];
            delete tokens[token];
        }
    };

    this.get = function (envelope) {
        if (!envelope.data)
            return [];

        var handlers = [];

        for (var property in properties)
            if (properties.hasOwnProperty(property)) {
                var value = expressions.evaluateKeyPath(property, envelope),
                    propertyHandlers = utils.values(properties[property][value]);

                for (var i = 0, l = propertyHandlers.length; i < l; i++) {
                    var handler = propertyHandlers[i];
                    if (handler.constructor === ExpressionFilter)
                        handlers = handlers.concat(handler.get(envelope));
                    else
                        handlers.push(handler)
                }
            }

        return handlers;
    };

    function assignExpression(value, token, expression) {
        if (!properties[expression.p])
            properties[expression.p] = {};

        var property = properties[expression.p];
        if (!property[expression.v])
            property[expression.v] = {};

        property[expression.v][token] = value;
        tokens[token] = expression;
    }
};
},{"../utils":21,"tribe.expressions":5}],15:[function(require,module,exports){
var channel = require('./channel'),
    actor = require('./actor'),
    utils = require('./utils'),
    expressions = require('tribe.expressions');

// most of these functions should probably be prototype functions

var lifetime = module.exports = function (parent, owner, scope) {
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
        var expressionWithScope = expressions.combine(expression, expressions.create(scope, 'data'));
        var token = parent.subscribe(topic, func, expressionWithScope);
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

    this.createLifetime = function (additionalScope) {
        return new lifetime(self, self.owner, utils.extend({}, scope, additionalScope));
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

        if(scope) {
            if(!envelope.data)
                envelope.data = {};

            utils.each(scope, function (value, property) {
                envelope.data[property] = envelope.data[property] || value;
            });
        }

        return envelope;
    }
};

lifetime.prototype.startActor = function (definition, data) {
    return new actor(this, definition).start(data);
};

lifetime.prototype.channel = function (channelId) {
    return new channel(this, channelId);
};

},{"./actor":10,"./channel":12,"./utils":21,"tribe.expressions":5}],16:[function(require,module,exports){
var utils = require('./utils');

module.exports = {
    sync: false,
    handleExceptions: true,
    exceptionHandler: function(e, envelope) {
        typeof(console) !== 'undefined' && console.log("Exception occurred in subscriber to '" + envelope.topic + "': " + utils.errorDetails(e));
    }
};
},{"./utils":21}],17:[function(require,module,exports){
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

    var subscribers = this.subscribers = new topicList();

    function publish(envelope) {
        var messageSubscribers = subscribers.get(envelope),
            sync = envelope.sync === true || self.sync === true;

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

    this.createLifetime = function (scope) {
        return new lifetime(self, self, scope);
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

},{"./actor":10,"./channel":12,"./lifetime":15,"./options":16,"./subscribeOnce":18,"./subscribeTo":19,"./topicList":20,"./utils":21}],18:[function(require,module,exports){
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
},{"./utils":21}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
var filterTypes = {
    'default': require('./filters/default'),
    'expression': require('./filters/expression')
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
            filter = (expression && (expression.constructor !== Array || expression.length > 0)) ? 'expression' : 'default';

        if (!topics.hasOwnProperty(topic))
            topics[topic] = {};

        var filters = topics[topic];
        if (!filters[filter])
            filters[filter] = new filterTypes[filter](topic);

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
},{"./filters/default":13,"./filters/expression":14}],21:[function(require,module,exports){
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

utils.extend = function (target, source) {
    var args = Array.prototype.slice.call(arguments);
    for(var i = 1, l = args.length; i < l; i++)
        utils.each(args[i], function (value, property) {
            target[property] = value;
        });
    return target;
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

},{}]},{},[11]);
