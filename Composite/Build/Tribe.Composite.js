/*! The Tribe platform is licensed under the MIT license. See http://tribejs.com/ for more information. */
// PubSub.js
window.Tribe = window.Tribe || {};
Tribe.PubSub = function (options) {
    var self = this;
    var utils = Tribe.PubSub.utils;

    this.owner = this;
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
            
            if(option('handleExceptions'))
                try {
                    func(envelope.data, envelope);
                } catch (e) {
                    if (exceptionHandler) exceptionHandler(e, envelope);
                }
            else
                func(envelope.data, envelope);
        }
    }

    this.publish = function (topicOrEnvelope, data) {
        var envelope = topicOrEnvelope && topicOrEnvelope.topic
            ? topicOrEnvelope
            : { topic: topicOrEnvelope, data: data, sync: false };
        return publish(envelope);
    };

    this.publishSync = function (topic, data) {
        return publish({ topic: topic, data: data, sync: true });
    };

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
    
    function option(name) {
        return (options && options.hasOwnProperty(name)) ? options[name] : Tribe.PubSub.options[name];
    }
};

// Lifetime.js
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
// options.js
window.Tribe.PubSub.options = {
    sync: false,
    handleExceptions: true,
    exceptionHandler: function(e, envelope) {
        window.console && console.log("Exception occurred in subscriber to '" + envelope.topic + "': " + e.message);
    }
};
// Saga.js
Tribe.PubSub.Saga = function (pubsub, definition, args) {
    var self = this;
    var utils = Tribe.PubSub.utils;

    pubsub = pubsub.createLifetime();
    this.pubsub = pubsub;
    this.children = [];

    definition = createDefinition(definition, Array.prototype.slice.call(arguments, 2));
    var handlers = definition.handles || {};

    this.start = function (data) {
        utils.each(handlers, attachHandler);
        if (handlers.onstart) handlers.onstart(data, self);
        return self;
    };

    this.startChild = function (child, args) {
        self.children.push(new Tribe.PubSub.Saga(pubsub, createDefinition(child, Array.prototype.slice.call(arguments, 1)))
            .start());
        return self;
    };

    this.end = function (data) {
        if (handlers.onend) handlers.onend(data, self);
        pubsub.end();
        endChildren(data);
        return self;
    };

    function attachHandler(handler, topic) {
        if (topic !== 'onstart' && topic !== 'onend')
            if (!handler)
                pubsub.subscribe(topic, endHandler());
            else if (handler.constructor === Function)
                pubsub.subscribe(topic, messageHandlerFor(handler));
            else
                pubsub.subscribe(topic, childHandlerFor(handler));
    }

    function messageHandlerFor(handler) {
        return function (messageData, envelope) {
            if (!definition.endsChildrenExplicitly)
                endChildren(messageData);
            handler(messageData, envelope, self);
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

    function endChildren(data) {
        Tribe.PubSub.utils.each(self.children, function(child) {
             child.end(data);
        });
    }
    
    function createDefinition(constructor, argsToApply) {
        if (constructor.constructor === Function) {
            var definitionArgs = [self].concat(argsToApply);
            constructor = utils.applyToConstructor(constructor, definitionArgs);
        }
        return constructor;
    }
};

Tribe.PubSub.Saga.startSaga = function (definition, args) {
    var constructorArgs = [this, definition].concat(Array.prototype.slice.call(arguments, 1));
    var saga = Tribe.PubSub.utils.applyToConstructor(Tribe.PubSub.Saga, constructorArgs);
    return saga.start();
};


Tribe.PubSub.prototype.startSaga = Tribe.PubSub.Saga.startSaga;
Tribe.PubSub.Lifetime.prototype.startSaga = Tribe.PubSub.Saga.startSaga;
// subscribeOnce.js
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
// SubscriberList.js
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
// utils.js
Tribe.PubSub.utils = {};
(function(utils) {
    utils.isArray = function (source) {
        return source.constructor === Array;
    };

    // these implementations from http://stackoverflow.com/questions/3362471/how-can-i-call-a-javascript-constructor-using-call-or-apply
    
    // far simpler, but doesn't support IE8.
    //utils.applyToConstructor = function(constructor, argArray) {
    //    var args = [null].concat(argArray);
    //    var factoryFunction = constructor.bind.apply(constructor, args);
    //    return new factoryFunction();
    //};

    // this does not support Date
    utils.applyToConstructor = function(Constructor, args) {
        var Temp = function() {
        }, // temporary constructor
            inst, ret; // other vars

        // Give the Temp constructor the Constructor's prototype
        Temp.prototype = Constructor.prototype;

        // Create a new instance
        inst = new Temp;

        // Call the original Constructor with the temp
        // instance as its context (i.e. its 'this' value)
        ret = Constructor.apply(inst, args);

        // If an object has been returned then return it otherwise
        // return the original instance.
        // (consistent with behaviour of the new operator)
        return Object(ret) === ret ? ret : inst;
    };

    // The following functions are taken from the underscore library, duplicated to avoid dependency. Licensing at http://underscorejs.org.
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
})(Tribe.PubSub.utils);

// setup.js
(function (global) {
    if (!jQuery)
        throw 'jQuery must be loaded before knockout.composite can initialise';
    if (!ko)
        throw 'knockout.js must be loaded before knockout.composite can initialise';

    global.Tribe = global.Tribe || {};
    global.Tribe.Composite = {};
    global.TC = global.Tribe.Composite;
    global.TC.Events = {};
    global.TC.Factories = {};
    global.TC.LoadHandlers = {};
    global.TC.LoadStrategies = {};
    global.TC.Loggers = {};
    global.TC.Transitions = {};
    global.TC.Types = {};
    global.TC.Utils = {};
    global.T = global.TC.Utils;

    $(function() {
        $('head').append('<style class="__tribe">.__rendering { position: fixed; top: -10000px; left: -10000px; }</style>');
    });
})(window || this);

// options.js
TC.defaultOptions = function() {
    return {
        synchronous: false,
        handleExceptions: true,
        basePath: '',
        loadStrategy: 'adhoc',
        events: ['loadResources', 'createPubSub', 'createModel', 'initialiseModel', 'renderPane', 'renderComplete', 'active', 'dispose']
    };
};
TC.options = TC.defaultOptions();
// Utilities/bindingHandlers.js
(function () {
    ko.bindingHandlers.cssClass = {
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            if (value)
                $(element).addClass(ko.utils.unwrapObservable(value));
        }
    };

    ko.bindingHandlers.enterPressed = keyPressedBindingHandler(13);
    ko.bindingHandlers.escapePressed = keyPressedBindingHandler(27);
    
    function keyPressedBindingHandler(which) {
        return {
            init: function (element, valueAccessor) {
                var $element = $(element);
                var callback = valueAccessor();
                if ($.isFunction(callback))
                    $element.keyup(testKey);

                function testKey(event) {
                    if (event.which === which) {
                        //$element.blur();
                        callback($element.val());
                    }
                }
            }
        };
    }

})();
// Utilities/collections.js
(function (utils) {    
    utils.each = function (collection, iterator) {
        return $.each(collection || [], function (index, value) {
            return iterator(value, index);
        });
    };

    // jQuery map flattens returned arrays - we don't want this for grids
    utils.map = function (collection, iterator) {
        var result = [];
        utils.each(collection || [], function(value, index) {
            result.push(iterator(value, index));
        });
        return result;
    };

    utils.filter = function(array, iterator) {
        var result = [];
        $.each(array || [], function(index, value) {
            if (iterator(value, index))
                result.push(value);
        });
        return result;
    };

    utils.pluck = function(array, property) {
        return utils.map(array, function(value) {
            return value && value[property];
        });
    };

    utils.reduce = function (array, initialValue, reduceFunction) {
        utils.each(array, function(value, index) {
            initialValue = reduceFunction(initialValue, value, index, array);
        });
        return initialValue;
    };
})(TC.Utils);
// Utilities/embeddedContext.js
(function() {
    TC.Utils.embedState = function (model, context, node) {
        embedProperty(model, 'context', context);
        embedProperty(model, 'node', node);
    };

    TC.Utils.contextFor = function (element) {
        return element && TC.Utils.extractContext(ko.contextFor($(element)[0]));
    };

    TC.Utils.extractContext = function (koBindingContext) {
        return koBindingContext && embeddedProperty(koBindingContext.$root, 'context');
    };

    TC.Utils.extractNode = function (koBindingContext) {
        return koBindingContext && embeddedProperty(koBindingContext.$root, 'node');
    };

    function embedProperty(target, key, value) {
        if (!target)
            throw "Can't embed property in falsy value";
        target['__' + key] = value;
    }

    function embeddedProperty(target, key) {
        return target && target['__' + key];
    }
})();

// Utilities/events.js
(function () {
    TC.Utils.elementDestroyed = function (element) {
        if (element.constructor === jQuery)
            element = element[0];

        var promise = $.Deferred();

        // Resolve when an element is removed using jQuery. This is a fallback for browsers not supporting DOMNodeRemoved and also executes synchronously.
        $(element).on('destroyed', resolve);

        // Resolve using the DOMNodeRemoved event. Not all browsers support this.
        $(document).on("DOMNodeRemoved", matchElement);

        function matchElement(event) {
            if (event.target === element)
                resolve();
        }

        function resolve() {
            $(element).off('destroyed', resolve);
            $(document).off('DOMNodeRemoved', matchElement);
            promise.resolve();
        }

        return promise;
    };

    // this used to use DOM functions to raise events, but IE8 doesn't support custom events
    // we'll use jQuery, but expose the originalEvent for DOM events and the jQuery event
    // for custom events (originalEvent is null for custom events).
    TC.Utils.raiseDocumentEvent = function (name, eventData) {
        var e = $.Event(name);
        e.eventData = eventData;
        $(document).trigger(e);
    };

    var handlers = {};

    // if a handler is used for more than one event, a leak will occur
    TC.Utils.handleDocumentEvent = function (name, handler) {
        $(document).on(name, internalHandler);
        handlers[handler] = internalHandler;
        
        function internalHandler(e) {
            handler(e.originalEvent || e);
        }
    };

    TC.Utils.detachDocumentEvent = function (name, handler) {
        $(document).off(name, handlers[handler]);
        delete handlers[handler];
    };
})();
// Utilities/exceptions.js
TC.Utils.tryCatch = function(func, args, handleExceptions, message) {
    if (handleExceptions)
        try {
            func.apply(this, args || []);
        } catch (ex) {
            TC.logger.error(message, ex);
        }
    else
        func.apply(this, args || []);
};
// Utilities/idGenerator.js
(function () {
    TC.Utils.idGenerator = function () {
        return {
            next: (function () {
                var id = 0;
                return function () {
                    if (arguments[0] == 0) {
                        id = 1;
                        return 0;
                    } else
                        return id++;
                };
            })()
        };
    };

    var generator = TC.Utils.idGenerator();
    TC.Utils.getUniqueId = function () {
        return generator.next();
    };
})();
// Utilities/indexOf.js
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
// Utilities/jquery.complete.js
(function ($) {
    $.complete = function (deferreds) {
        var wrappers = [];
        var deferred = $.Deferred();
        var resolve = false;

        if ($.isArray(deferreds))
            $.each(deferreds, wrapDeferred);
        else
            wrapDeferred(0, deferreds);

        $.when.apply($, wrappers).done(function() {
            resolve ?
                deferred.resolve() :
                deferred.reject();
        });

        return deferred;

        function wrapDeferred(index, original) {
            wrappers.push($.Deferred(function (thisDeferred) {
                $.when(original)
                    .done(function() {
                        resolve = true;
                    })
                    .always(function () {
                        thisDeferred.resolve();
                    });
            }));
        }
    };
})(jQuery);
// Utilities/jquery.destroyed.js
(function ($) {
    var oldClean = jQuery.cleanData;

    // knockout also calls cleanData from it's cleanNode method - avoid any loops
    //var cleaning = {};

    $.cleanData = function (elements) {
        for (var i = 0, element; (element = elements[i]) !== undefined; i++) {
            //if (!cleaning[element]) {
                //cleaning[element] = true;
                $(element).triggerHandler("destroyed");
                //delete cleaning[element];
            //}
        }
        oldClean(elements);
    };
})(jQuery);
// Utilities/knockout.js
TC.Utils.cleanElement = function (element) {
    // prevent knockout from calling cleanData 
    // - calls to this function ultimately result from cleanData being called by jQuery, so a loop will occur
    var func = $.cleanData;
    $.cleanData = undefined;
    ko.cleanNode(element);
    $.cleanData = func;
};
// Utilities/objects.js
TC.Utils.arguments = function (args) {
    var byConstructor = {};
    $.each(args, function (index, arg) {
        byConstructor[arg.constructor] = arg;
    });

    return {
        byConstructor: function (constructor) {
            return byConstructor(constructor);
        },
        object: byConstructor[Object],
        string: byConstructor[String],
        func: byConstructor[Function],
        array: byConstructor[Array],
        number: byConstructor[Number]
    };
};

TC.Utils.removeItem = function (array, item) {
    var index = $.inArray(item, array);
    if (index > -1)
        array.splice(index, 1);
};

TC.Utils.inheritOptions = function (from, to, options) {
    for (var i = 0, l = options.length; i < l; i++)
        to[options[i]] = from[options[i]];
    return to;
};

TC.Utils.cloneData = function (from, except) {
    if (!from) return;
    var result = {};
    for (var property in from) {
        var value = from[property];
        if (from.hasOwnProperty(property) &&
            (!except || Array.prototype.indexOf.call(arguments, property) === -1) &&
            (!value || (value.constructor !== Function || ko.isObservable(value))))

            result[property] = ko.utils.unwrapObservable(value);
    }
    return result;
};

TC.Utils.normaliseBindings = function (valueAccessor, allBindingsAccessor) {
    var data = allBindingsAccessor();
    data.value = valueAccessor();
    if (!ko.isObservable(data.value) && $.isFunction(data.value))
        data.value = data.value();
    return data;
};


// Utilities/panes.js
(function () {
    var utils = TC.Utils;

    utils.getPaneOptions = function(value, otherOptions) {
        var options = value.constructor === String ? { path: value } : value;
        return $.extend({}, otherOptions, options);
    };

    utils.bindPane = function (node, element, paneOptions, context) {
        context = context || utils.contextFor(element) || TC.context();
        var pane = new TC.Types.Pane($.extend({ element: $(element)[0] }, paneOptions));
        node.setPane(pane);

        context.renderOperation.add(pane);

        var pipeline = new TC.Types.Pipeline(TC.Events, context);
        pipeline.execute(context.options.events, pane);

        return pane;
    };

    utils.insertPaneAfter = function (node, target, paneOptions, context) {
        var element = $('<div/>').insertAfter(target);
        return utils.bindPane(node, element, paneOptions, context);
    };
})();

// Utilities/Path.js
(function() {
    TC.Path = Path;

    function Path(path) {
        path = path ? normalise(path.toString()) : '';
        var filenameIndex = path.lastIndexOf("/") + 1;
        var extensionIndex = path.lastIndexOf(".");

        return {
            withoutFilename: function() {
                return Path(path.substring(0, filenameIndex));
            },
            filename: function() {
                return Path(path.substring(filenameIndex));
            },
            extension: function() {
                return extensionIndex === -1 ? '' : path.substring(extensionIndex + 1);
            },
            withoutExtension: function() {
                return Path(extensionIndex === -1 ? path : path.substring(0, extensionIndex));
            },
            combine: function (additionalPath) {
                return Path((path ? path + '/' : '') + additionalPath.toString());
            },
            isAbsolute: function() {
                return path.charAt(0) === '/' ||
                    path.indexOf('://') > -1;
            },
            makeAbsolute: function() {
                return Path('/' + path);
            },
            makeRelative: function() {
                return Path(path.charAt(0) === '/' ? path.substring(1) : path);
            },
            asMarkupIdentifier: function() {
                return this.withoutExtension().toString().replace(/\//g, '-').replace(/\./g, '');
            },
            setExtension: function(extension) {
                return Path(this.withoutExtension() + '.' + extension);
            },
            toString: function() {
                return path.toString();
            }
        };

        function normalise(input) {
            input = removeDoubleSlashes(input);
            input = removeParentPaths(input);
            input = removeCurrentPaths(input);

            return input;
        }

        function removeDoubleSlashes(input) {
            var prefixEnd = input.indexOf('://') > -1 ? input.indexOf('://') + 3 : 0;
            var prefix = input.substring(0, prefixEnd);
            var inputPath = input.substring(prefixEnd);
            return prefix + inputPath.replace(/\/{2,}/g, '/');
        }

        function removeParentPaths(input) {
            var regex = /[^\/\.]+\/\.\.\//;

            while (input.match(regex))
                input = input.replace(regex, '');

            return input;
        }

        function removeCurrentPaths(input) {
            var regex = /\.\//g;
            // Ignore leading parent paths - the rest will have been stripped
            // I can't figure out a regex that won't strip the ./ out of ../
            var startIndex = input.lastIndexOf('../');
            startIndex = startIndex == -1 ? 0 : startIndex + 3;
            return input.substring(0, startIndex) + input.substring(startIndex).replace(regex, '');
        }
    };
})();

// Utilities/querystring.parse.js
(function () {
    // This is a modified version of modules from the YUI Library - 
    // http://yuilibrary.com/yui/docs/api/files/querystring_js_querystring-parse.js.html
    // Either it should be rewritten or attribution and licensing be available here and on the website like in http://yuilibrary.com/license/

    TC.Utils.Querystring = TC.Utils.Querystring || {};

    TC.Utils.Querystring.parse = function (source, seperator, eqSymbol) {
        stripLeadIn();
        
        return TC.Utils.reduce(
            TC.Utils.map(
                source.split(seperator || "&"),
                pieceParser(eqSymbol || "=")
            ),
            {},
            mergeParams
        );

        function stripLeadIn() {
            if(source.length > 0 && source.charAt(0) === '?')
                source = source.substring(1);
        }
    };
    
    function unescape(s) {
        return decodeURIComponent(s.replace(/\+/g, ' '));
    };

    function pieceParser(eq) {
        return function parsePiece(key, val) {

            var sliced, numVal, head, tail, ret;

            if (arguments.length === 2) {
                // key=val, called from the map/reduce
                key = key.split(eq);
                return parsePiece(
                    unescape(key.shift()),
                    unescape(key.join(eq)),
                    true
                );
            }
            
            key = key.replace(/^\s+|\s+$/g, '');
            if (val.constructor === String) {
                val = val.replace(/^\s+|\s+$/g, '');
                // convert numerals to numbers
                if (!isNaN(val)) {
                    numVal = +val;
                    if (val === numVal.toString(10)) {
                        val = numVal;
                    }
                }
            }
            
            sliced = /(.*)\[([^\]]*)\]$/.exec(key);
            if (!sliced) {
                ret = {};
                if (key)
                    ret[key] = val;
                return ret;
            }
            
            // ["foo[][bar][][baz]", "foo[][bar][]", "baz"]
            tail = sliced[2];
            head = sliced[1];

            // array: key[]=val
            if (!tail)
                return parsePiece(head, [val], true);

            // object: key[subkey]=val
            ret = {};
            ret[tail] = val;
            return parsePiece(head, ret, true);
        };
    }

    // the reducer function that merges each query piece together into one set of params
    function mergeParams(params, addition) {
        return (
            // if it's uncontested, then just return the addition.
            (!params) ? addition
            // if the existing value is an array, then concat it.
            : ($.isArray(params)) ? params.concat(addition)
            // if the existing value is not an array, and either are not objects, arrayify it.
            : (!$.isPlainObject(params) || !$.isPlainObject(addition)) ? [params].concat(addition)
            // else merge them as objects, which is a little more complex
            : mergeObjects(params, addition)
        );
    }

    // Merge two *objects* together. If this is called, we've already ruled
    // out the simple cases, and need to do the for-in business.
    function mergeObjects(params, addition) {
        for (var i in addition)
            if (i && addition.hasOwnProperty(i))
                params[i] = mergeParams(params[i], addition[i]);

        return params;
    }
})();

// Utilities/querystring.stringify.js
(function () {
    // This is a modified version of modules from the YUI Library - 
    // http://yuilibrary.com/yui/docs/api/files/querystring_js_querystring-stringify.js.html
    // Either it should be rewritten or attribution and licensing be available here and on the website like in http://yuilibrary.com/license/

    TC.Utils.Querystring = TC.Utils.Querystring || {};

    var escape = encodeURIComponent;

    TC.Utils.Querystring.stringify = function (source, options) {
        return stringify(source, options);
    };

    function stringify(source, options, name, stack) {
        options = options || {};
        stack = stack || [];
        var begin, end, i, l, n, s;
        var sep = options.seperator || "&";
        var eq = options.eqSymbol || "=";
        var arrayKey = options.arrayKey !== false;

        if (source === null || source === undefined || source.constructor === Function)
            return name ? escape(name) + eq : '';

        if (source.constructor === Boolean || Object.prototype.toString.call(source) === '[object Boolean]')
            source = +source;

        if (!isNaN(source) || source.constructor === String)
            return escape(name) + eq + escape(source);

        if ($.isArray(source)) {
            s = [];
            name = arrayKey ? name + '[]' : name;
            for (i = 0, l = source.length; i < l; i++) {
                s.push(stringify(source[i], options, name, stack));
            }

            return s.join(sep);
        }
        
        // now we know it's an object.
        // Check for cyclical references in nested objects
        for (i = stack.length - 1; i >= 0; --i)
            if (stack[i] === source)
                throw new Error("TC.Utils.Querystring.stringify: cyclical reference");

        stack.push(source);
        s = [];
        begin = name ? name + '[' : '';
        end = name ? ']' : '';
        for (i in source) {
            if (source.hasOwnProperty(i)) {
                n = begin + i + end;
                s.push(stringify(source[i], options, n, stack));
            }
        }

        stack.pop();
        s = s.join(sep);
        if (!s && name)
            return name + "=";

        return s;
    };
})();

// Types/Flow.js
(function () {
    TC.Types.Flow = function (navigationSource, definition, args) {
        var self = this;

        this.node = navigationNode();
        this.pubsub = this.node.pane.pubsub.owner;
        this.sagas = [];

        definition = createDefinition(self, definition, Array.prototype.slice.call(arguments, 2));
        this.saga = new Tribe.PubSub.Saga(this.pubsub, definition);

        this.start = function(data) {
            self.saga.start(data);
            return self;
        };

        this.end = function(data) {
            self.saga.end(data);
            TC.Utils.each(self.sagas, function(saga) {
                saga.end(data);
            });
            return self;
        };

        function navigationNode() {
            if (navigationSource.constructor === TC.Types.Node)
                return navigationSource.findNavigation().node;
            if (navigationSource.constructor === TC.Types.Pane)
                return navigationSource.node.findNavigation().node;
            throw new Error("navigationSource must be either TC.Types.Pane or TC.Types.Node");
        }
    };

    TC.Types.Flow.prototype.startChild = function(definition, args) {
        definition = createDefinition(this, definition, Array.prototype.slice.call(arguments, 1));
        this.saga.startChild(definition);
        return this;
    };

    TC.Types.Flow.prototype.navigate = function (pathOrOptions, data) {
        this.node.navigate(pathOrOptions, data);
    };
    
    // This keeps a separate collection of sagas bound to this flow's lifetime
    // It would be nice to make them children of the underlying saga, but
    // then they would end any time a message was executed.
    TC.Types.Flow.prototype.startSaga = function (definition, args) {
        var saga = this.pubsub.startSaga.apply(this.pubsub, arguments);
        this.sagas.push(saga);
        return saga;
    };

    // flow helpers
    TC.Types.Flow.prototype.to = function (pathOrOptions, data) {
        var node = this.node;
        return function () {
            node.navigate(pathOrOptions, data);
        };
    };

    TC.Types.Flow.prototype.endsAt = function (pathOrOptions, data) {
        var flow = this;
        return function () {
            flow.node.navigate(pathOrOptions, data);
            flow.end();
        };
    };

    TC.Types.Flow.prototype.start = function(flow, args) {
        var thisFlow = this;
        var childArguments = arguments;
        return function() {
            thisFlow.startChild.apply(thisFlow, childArguments);
        };
    };


    // This is reused by Node and Pane
    TC.Types.Flow.startFlow = function (definition, args) {
        var constructorArgs = [this, definition].concat(Array.prototype.slice.call(arguments, 1));
        var flow = Tribe.PubSub.utils.applyToConstructor(TC.Types.Flow, constructorArgs);
        return flow.start();
    };
    
    function createDefinition(flow, definition, argsToApply) {
        if (definition.constructor === Function) {
            var definitionArgs = [flow].concat(argsToApply);
            definition = Tribe.PubSub.utils.applyToConstructor(definition, definitionArgs);
        }
        return definition;
    }
})();
// Types/History.js
TC.Types.History = function (history) {
    var currentState = 0;
    history.replaceState(currentState, window.title);

    var popActions = {
        raiseEvent: function (e) {
            TC.Utils.raiseDocumentEvent('browser.go', { count: (e.state - currentState) });
            currentState = e.state;
        },
        updateStack: function(e) {
            currentState = e.state;
            currentAction = popActions.raiseEvent;
        }
    };
    var currentAction = popActions.raiseEvent;

    TC.Utils.handleDocumentEvent('popstate', executeCurrentAction);

    function executeCurrentAction(e) {
        if (e.state !== null) currentAction(e);
    }

    this.navigate = function (urlOptions) {
        urlOptions = urlOptions || {};
        history.pushState(++currentState, urlOptions.title, urlOptions.url);
    };

    this.go = function(frameCount) {
        history.go(frameCount);
    };

    this.update = function(frameCount) {
        currentAction = popActions.updateStack;
        history.go(frameCount);
    };

    this.dispose = function () {
        TC.Utils.detachDocumentEvent('popstate', executeCurrentAction);
    };
};

if (window.history.pushState)
    TC.history = new TC.Types.History(window.history);
else
    TC.history = new TC.Types.History({
        replaceState: function () { },
        pushState: function () { },
        go: function () { }
    });
// Types/Loader.js
TC.Types.Loader = function () {
    var self = this;
    var resources = {};

    this.get = function(url, resourcePath, context) {
        if (resources[url] !== undefined)
            return resources[url];

        var extension = TC.Path(url).extension().toString();
        var handler = TC.LoadHandlers[extension];

        if (handler) {
            var result = handler(url, resourcePath, context);
            resources[url] = result;
            
            $.when(result).always(function() {
                resources[url] = null;
            });
            
            return result;
        }

        TC.logger.warn("Resource of type " + extension + " but no handler registered.");
        return null;
    };
};

// Types/Logger.js
TC.Types.Logger = function () {
    var logLevel = 0;
    var logger = 'console';

    var levels = {
        0: 'debug',
        1: 'info',
        2: 'warn',
        3: 'error',
        4: 'none'
    };

    this.debug = function (message) {
        log(0, message);
    };

    this.info = function (message) {
        log(1, message);
    };

    this.warn = function (message) {
        log(2, message);
    };

    this.error = function (message, error) {
        var logString;
        if (error && error.stack)
            logString = message + ' ' + error.stack;
        else if (error && error.message)
            logString = message + ' ' + error.message;
        else
            logString = message + ' ' + (error ? error : '');

        log(3, logString);
    };

    function log(level, message) {
        if(logLevel <= level)
            TC.Loggers[logger](levels[level], message);
    };

    this.setLogLevel = function (level) {
        $.each(levels, function(value, text) {
            if (level === text)
                logLevel = value;
        });
    };

    this.setLogger = function(newLogger) {
        logger = newLogger;
    };
};

TC.logger = new TC.Types.Logger();
// Types/Models.js
TC.Types.Models = function () { };

TC.Types.Models.prototype.register = function (resourcePath, constructor, options) {
    this[resourcePath] = {
        constructor: constructor,
        options: options || {}
    };
    TC.logger.debug("Model loaded for " + resourcePath);
};
// Types/Navigation.js
TC.Types.Navigation = function (node, options) {
    normaliseOptions();
    setInitialPaneState();

    var stack = [initialStackItem()];
    var currentFrame = 0;

    this.node = node;
    this.stack = stack;

    this.navigate = function (paneOptions) {
        if (options.browser)
            TC.history.navigate(options.browser && options.browser.urlDataFrom(paneOptions));

        trimStack();
        stack.push(paneOptions);
        currentFrame++;

        navigateTo(paneOptions);
    };

    this.isAtStart = function() {
        return currentFrame === 0;
    };

    this.go = function(frameCount) {
        go(frameCount);
        if (options.browser) TC.history.update(frameCount);
    };
    
    if(options.browser) TC.Utils.handleDocumentEvent('browser.go', onBrowserGo);
    function onBrowserGo(e) {
        go(e.eventData.count);
    }

    function go(frameCount) {
        var newFrame = currentFrame + frameCount;
        if (newFrame < 0) newFrame = 0;
        if (newFrame >= stack.length) newFrame = stack.length - 1;

        if (newFrame != currentFrame)
            navigateTo(stack[newFrame], frameCount < 0);

        currentFrame = newFrame;
    }

    function navigateTo(paneOptions, reverse) {
        TC.Utils.raiseDocumentEvent('navigating', { node: node, options: paneOptions, browserData: options.browserData });
        node.transitionTo(paneOptions, options.transition, reverse);
    }

    function trimStack() {
        stack.splice(currentFrame + 1, stack.length);
    }

    this.dispose = function() {
        TC.Utils.detachDocumentEvent('browser.go', onBrowserGo)
    };
    
    function normaliseOptions() {
        options = options || {};
        if (options.constructor === String)
            options = { transition: options };
        if (options.browser === true)
            options.browser = TC.options.defaultUrlProvider;
    }
    
    function setInitialPaneState() {
        var urlState = options.browser && options.browser.paneOptionsFrom(window.location.search);
        if (urlState) {
            node.pane.path = urlState.path;
            node.pane.data = urlState.data;
        }
    }
    
    function initialStackItem() {
        return { path: node.pane.path, data: node.pane.data };
    }
};
// Types/Node.js
TC.Types.Node = function (parent, pane) {
    this.parent = parent;
    this.children = [];
    this.root = parent ? parent.root : this;
    this.id = TC.Utils.getUniqueId();

    if (parent) parent.children.push(this);
    if (pane) this.setPane(pane);
};

TC.Types.Node.prototype.navigate = function (pathOrPane, data) {
    var paneOptions = TC.Utils.getPaneOptions(pathOrPane, { data: data });
    if (!TC.Path(paneOptions.path).isAbsolute())
        // this is duplicated in Pane.inheritPathFrom - the concept (relative paths inherit existing paths) needs to be clearer
        paneOptions.path = TC.Path(this.nodeForPath().pane.path).withoutFilename().combine(paneOptions.path).toString();
    
    this.findNavigation().navigate(paneOptions);
};

TC.Types.Node.prototype.navigateBack = function () {
    this.findNavigation().go(-1);
};

TC.Types.Node.prototype.findNavigation = function() {
    if (this.defaultNavigation)
        return this.defaultNavigation;

    else if (this.navigation)
        return this.navigation;
        
    if (!this.parent) {
        this.navigation = new TC.Types.Navigation(this);
        return this.navigation;
    }

    return this.parent.findNavigation();
};

TC.Types.Node.prototype.transitionTo = function(paneOptions, transition, reverse) {
    TC.transition(this, transition, reverse).to(paneOptions);
};

TC.Types.Node.prototype.setPane = function (pane) {
    if (this.pane)
        this.pane.node = null;

    pane.node = this;
    this.pane = pane;
    this.skipPath = pane.skipPath;

    if (pane.handlesNavigation) {
        this.navigation = new TC.Types.Navigation(this, pane.handlesNavigation);
        
        // this sets this pane as the "default", accessible from panes outside the tree. First in best dressed.
        this.root.defaultNavigation = this.root.defaultNavigation || this.navigation;
    }

    pane.inheritPathFrom(this.parent);
};

TC.Types.Node.prototype.nodeForPath = function() {
    return this.skipPath && this.parent ? this.parent.nodeForPath() : this;
};

TC.Types.Node.prototype.dispose = function() {
    if (this.root.defaultNavigation === this.navigation)
        this.root.defaultNavigation = null;

    if (this.parent)
        TC.Utils.removeItem(this.parent.children, this);

    if (this.pane && this.pane.dispose) {
        delete this.pane.node;
        this.pane.dispose();
    }
};

TC.Types.Node.prototype.startFlow = TC.Types.Flow.startFlow;

// Types/Operation.js
TC.Types.Operation = function () {
    var self = this;
    var incomplete = [];

    this.promise = $.Deferred();

    this.add = function(id) {
        incomplete.push(id);
    };

    this.complete = function (id) {
        TC.Utils.removeItem(incomplete, id);
        if (incomplete.length === 0)
            self.promise.resolve();
    };
    
};
// Types/Pane.js
TC.Types.Pane = function (options) {
    TC.Utils.inheritOptions(options, this, ['path', 'data', 'element', 'transition', 'reverseTransitionIn', 'handlesNavigation', 'pubsub', 'id', 'skipPath']);

    // events we are interested in hooking in to - this could be done completely generically by the pipeline
    this.is = {
        rendered: $.Deferred(),
        disposed: $.Deferred()
    };    
};

TC.Types.Pane.prototype.navigate = function (pathOrPane, data) {
    this.node && this.node.navigate(pathOrPane, data);
};

TC.Types.Pane.prototype.navigateBack = function () {
    this.node && this.node.navigateBack();
};

TC.Types.Pane.prototype.remove = function () {
    $(this.element).remove();
};

TC.Types.Pane.prototype.dispose = function () {
    if (this.model && this.model.dispose)
        this.model.dispose();

    if (this.node) {
        delete this.node.pane;
        this.node.dispose();
    }

    if (this.element)
        TC.Utils.cleanElement(this.element);
};

TC.Types.Pane.prototype.inheritPathFrom = function (node) {
    node = node && node.nodeForPath();
    var pane = node && node.pane;    
    var path = TC.Path(this.path);
    if (path.isAbsolute() || !pane)
        this.path = path.makeAbsolute().toString();
    else
        this.path = TC.Path(pane.path).withoutFilename().combine(path).toString();
};

TC.Types.Pane.prototype.find = function(selector) {
    return $(this.element).find(selector);
};

TC.Types.Pane.prototype.startRender = function () {
    $(this.element).addClass('__rendering');
};

TC.Types.Pane.prototype.endRender = function () {
    $(this.element).removeClass('__rendering');
};

TC.Types.Pane.prototype.toString = function () {
    return "{ path: '" + this.path + "' }";
};

TC.Types.Pane.prototype.startFlow = TC.Types.Flow.startFlow;

// Types/Pipeline.js
TC.Types.Pipeline = function (events, context) {
    this.execute = function (eventsToExecute, target) {
        var currentEvent = -1;
        var promise = $.Deferred();
        executeNextEvent();

        function executeNextEvent() {
            currentEvent++;
            if (currentEvent >= eventsToExecute.length) {
                promise.resolve();
                return;
            }

            var eventName = eventsToExecute[currentEvent];
            var thisEvent = events[eventName];

            if (!thisEvent) {
                TC.logger.warn("No event defined for " + eventName);
                executeNextEvent();
                return;
            }

            $.when(thisEvent(target, context))
                .done(executeNextEvent)
                .fail(handleFailure);

            function handleFailure() {
                promise.reject();
                var targetDescription = target ? target.toString() : "empty target";
                TC.logger.error("An error occurred in the '" + eventName + "' event for " + targetDescription);
            }
        }

        return promise;
    };
};
// Types/Templates.js
TC.Types.Templates = function () {
    var self = this;

    this.store = function (template, path) {
        var id = TC.Path(path).asMarkupIdentifier().toString();
        embedTemplate(template, 'template-' + id);
    };
    
    function embedTemplate(template, id) {
        var element = document.createElement('script');
        element.className = '__tribe';
        element.setAttribute('type', 'text/template');
        element.id = id;
        element.text = template;
        document.getElementsByTagName('head')[0].appendChild(element);
    }
    
    this.loaded = function(path) {
        return $('head script#template-' + TC.Path(path).asMarkupIdentifier()).length > 0;
    };

    this.render = function (target, path) {
        var id = TC.Path(path).asMarkupIdentifier();
        // can't use html() to append - this uses the element innerHTML property and IE7 and 8 will strip comments (i.e. containerless control flow bindings)
        $(target).empty().append($('head script#template-' + id).html());
    };
};
// Events/active.js
TC.Events.active = function (pane, context) {
    return TC.Utils.elementDestroyed(pane.element);
};
// Events/createModel.js
TC.Events.createModel = function (pane, context) {
    var definition = context.models[pane.path];
    var model = definition && definition.constructor ?
        new definition.constructor(pane) :
        { pane: pane, data: pane.data };

    TC.Utils.embedState(model, context, pane.node);

    pane.model = model;
};
// Events/createPubSub.js
TC.Events.createPubSub = function (pane, context) {
    if (context.pubsub)
        pane.pubsub = context.pubsub.createLifetime ?
            context.pubsub.createLifetime() :
            context.pubsub;
};

// Events/dispose.js
TC.Events.dispose = function (pane, context) {
    pane.pubsub && pane.pubsub.end && pane.pubsub.end();
    pane.dispose();
    pane.is.disposed.resolve();
};

// Events/initialiseModel.js
TC.Events.initialiseModel = function (pane, context) {
    if (pane.model.initialise)
        return pane.model.initialise();
    return null;
};
// Events/loadResources.js
TC.Events.loadResources = function (pane, context) {
    var strategy = TC.LoadStrategies[context.options.loadStrategy];
    
    if (!strategy)
        throw "Unknown resource load strategy";

    return strategy(pane, context);
};
// Events/renderComplete.js
TC.Events.renderComplete = function (pane, context) {
    $.when(
        TC.transition(pane, pane.transition, pane.reverseTransitionIn)['in']())
     .done(executeRenderComplete);
    
    setTimeout(function() {
        pane.endRender();
    });

    function executeRenderComplete() {
        if (pane.model.renderComplete)
            pane.model.renderComplete();
        pane.is.rendered.resolve();
        TC.Utils.raiseDocumentEvent('renderComplete', pane);
        context.renderOperation = new TC.Types.Operation();
    }
};
// Events/renderPane.js
TC.Events.renderPane = function (pane, context) {
    var renderOperation = context.renderOperation;

    pane.startRender();
    context.templates.render(pane.element, pane.path);
    TC.Utils.tryCatch(applyBindings, null, context.options.handleExceptions, 'An error occurred applying the bindings for ' + pane.toString());

    if (pane.model.paneRendered)
        pane.model.paneRendered();

    renderOperation.complete(pane);
    return renderOperation.promise;

    function applyBindings() {
        ko.applyBindingsToDescendants(pane.model, pane.element);
    }
};
// LoadHandlers/scripts.js
TC.LoadHandlers.js = function (url, resourcePath, context) {
    return $.ajax({
        url: url,
        dataType: 'text',
        async: !context.options.synchronous,
        cache: false,
        success: executeScript
    });

    function executeScript(script) {
        TC.scriptEnvironment = {
            url: url,
            resourcePath: resourcePath,
            context: context
        };

        TC.Utils.tryCatch($.globalEval, [appendSourceUrl(script)], context.options.handleExceptions,
            'An error occurred executing script loaded from ' + url + (resourcePath ? ' for resource ' + resourcePath : ''));

        delete TC.scriptEnvironment;

        TC.logger.debug('Loaded script from ' + url);
    }

    function appendSourceUrl(script) {
        return script + '\n//@ sourceURL=tribe://Application/' + url.replace(/ /g, "_");
    }    
};
// LoadHandlers/stylesheets.js
TC.LoadHandlers.css = function (url, resourcePath, context) {
    var supportsTextNodes = true;
    
    return $.ajax({
        url: url,
        dataType: 'text',
        async: !context.options.synchronous,
        cache: false,
        success: renderStylesheet
    });

    function renderStylesheet(stylesheet) {
        var element = document.getElementById('__tribeStyles');
        if (!element) {
            element = document.createElement('style');
            element.className = '__tribe';
            element.id = '__tribeStyles';
            document.getElementsByTagName('head')[0].appendChild(element);
        }

        if(supportsTextNodes)
            try {
                element.appendChild(document.createTextNode(stylesheet));
            } catch(ex) {
                supportsTextNodes = false;
            }

        if (!supportsTextNodes)
            if (element.styleSheet) {
                // using styleSheet.cssText is required for IE8 support
                // IE8 also has a limit on the number of <style/> elements, so append it to the same node
                element.styleSheet.cssText += stylesheet;
            } else throw new Error('Unable to append stylesheet for ' + resourcePath + ' to document.');
    }
};
// LoadHandlers/templates.js
TC.LoadHandlers.htm = function (url, resourcePath, context) {
    return $.ajax({
        url: url,
        dataType: 'html',
        async: !context.options.synchronous,
        cache: false,
        success: storeTemplate
    });

    function storeTemplate(template) {
        context.templates.store(template, resourcePath);
    }
};
TC.LoadHandlers.html = TC.LoadHandlers.htm;

// LoadStrategies/adhoc.js
TC.LoadStrategies.adhoc = function (pane, context) {
    if (context.loadedPanes[pane.path] !== undefined)
        return context.loadedPanes[pane.path];

    var path = TC.Path(context.options.basePath).combine(TC.Path(pane.path).makeRelative());

    if (context.templates.loaded(pane.path) || context.models[pane.path])
        return null;

    var deferred = $.complete([
        context.loader.get(path.setExtension('js').toString(), pane.path, context),
        context.loader.get(path.setExtension('htm').toString(), pane.path, context),
        context.loader.get(path.setExtension('css').toString(), pane.path, context)
    ]);

    context.loadedPanes[pane.path] = deferred;

    $.when(deferred)
        .fail(function() {
            TC.logger.error("Unable to load resources for '" + pane.path + "'.");
        })
        .always(function () {
            context.loadedPanes[pane.path] = null;
        });

    return deferred;
};
// LoadStrategies/preloaded.js
TC.LoadStrategies.preloaded = function (pane, context) {
    if (!context.models[pane.path] && !context.templates.loaded(pane.path)) {
        TC.logger.error("No resources loaded for '" + pane.path + "'.");
        return $.Deferred().reject();
    }
    return null;
};
// Transitions/transition.js
TC.transition = function (target, transition, reverse) {
    var node;
    var pane;
    var element;
    setState();
    
    transition = transition || (pane && pane.transition) || (node && node.transition);
    var implementation = TC.Transitions[transition];
    if (reverse && implementation && implementation.reverse)
        implementation = TC.Transitions[implementation.reverse];

    return {
        'in': function () {
            $(element).show();
            return implementation && implementation['in'](element);
        },
        
        out: function (remove) {
            setTransitionMode();
            
            var promise = implementation && implementation.out(element);
            $.when(promise).done(removeElement);
            return promise;
            
            function removeElement() {
                if (remove === false) {
                    $(element).hide().attr('style', '');
                } else
                    $(element).remove();
            }
        },
        
        to: function (paneOptions, remove) {
            var context = TC.context();
            if (node)
                TC.Utils.insertPaneAfter(node, element, TC.Utils.getPaneOptions(paneOptions, { transition: transition, reverseTransitionIn: reverse }), context);
            else
                TC.insertNodeAfter(element, TC.Utils.getPaneOptions(paneOptions, { transition: transition, reverseTransitionIn: reverse }), null, context);
            this.out(remove);
            return context.renderOperation.promise;
        }
    };
    
    function setTransitionMode() {
        var $element = $(element);
        if (TC.transition.mode === 'fixed')
            $element.css({
                position: 'fixed',
                width: $element.width(),
                left: $element.offset().left,
                top: $element.offset().top
            });
        else
            $element.css({
                position: 'absolute',
                width: $element.width(),
                left: $element.position().left,
                top: $element.position().top
            });
    }

    function setState() {
        if (!target) throw "No target passed to TC.transition";
        
        if (target.constructor === TC.Types.Node) {
            node = target;
            pane = node.pane;
            element = pane.element;
        } else if (target.constructor === TC.Types.Pane) {
            pane = target;
            node = pane.node;
            element = pane.element;
        } else {
            element = target;
        }
    }    
};
// Transitions/Css/css.js
(function () {
    var supported = supportsTransitions();
    
    createCssTransition('fade');
    createCssTransition('slideLeft', 'slideRight');
    createCssTransition('slideRight', 'slideLeft');
    createCssTransition('slideUp', 'slideDown');
    createCssTransition('slideDown', 'slideUp');

    var transitionEndEvents = 'webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd';

    function createCssTransition(transition, reverse) {
        TC.Transitions[transition] = {
            'in': function (element) {
                if (!supported) return null;
                
                var promise = $.Deferred();
                $(element).bind(transitionEndEvents, transitionEnded(element, promise))
                    .addClass('prepare in ' + transition);

                trigger(element);
                return promise;
            },

            out: function (element) {
                if (!supported) return null;
                var promise = $.Deferred();

                $(element).addClass('prepare out ' + transition)
                    .on(transitionEndEvents, transitionEnded(element, promise, true));

                trigger(element);
                return promise;
            },
            reverse: reverse || transition
        };

        function trigger(element) {
            setTimeout(function () {
                $(element).addClass('trigger');
            }, 30);
        }

        function transitionEnded(element, promise, hide) {
            return function() {
                $(element).unbind(transitionEndEvents)
                    .removeClass(transition + ' in out prepare trigger');
                if (hide) $(element).hide();
                promise.resolve();
            };
        }
    }
    
    function supportsTransitions() {
        var b = document.body || document.documentElement;
        var style = b.style;
        var property = 'transition';
        var vendors = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];

        if (typeof style[property] == 'string') { return true; }

        // Tests for vendor specific prop
        property = property.charAt(0).toUpperCase() + property.substr(1);
        for (var i = 0, l = vendors.length; i < l; i++) {
            if (typeof style[vendors[i] + property] == 'string') { return true; }
        }
        
        return false;
    }
})();

// Transitions/Css/style.css.js
//
window.__appendStyle = function (content) {
    var element = document.getElementById('__tribeStyles');
    if (!element) {
        element = document.createElement('style');
        element.className = '__tribe';
        element.id = '__tribeStyles';
        document.getElementsByTagName('head')[0].appendChild(element);
    }

    if(element.styleSheet)
        element.styleSheet.cssText += content;
    else
        element.appendChild(document.createTextNode(content));
};//
window.__appendStyle('.trigger{-webkit-transition:all 250ms ease-in-out;transition:all 250ms ease-in-out}.fade.in.prepare{opacity:0}.fade.in.trigger{opacity:1}.fade.out.prepare{opacity:1}.fade.out.trigger{opacity:0}.slideRight.in.prepare{-webkit-transform:translateX(-100%);transform:translateX(-100%)}.slideRight.in.trigger{-webkit-transform:translateX(0);transform:translateX(0)}.slideRight.out.trigger{-webkit-transform:translateX(100%);transform:translateX(100%)}.slideLeft.in.prepare{-webkit-transform:translateX(100%);transform:translateX(100%)}.slideLeft.in.trigger{-webkit-transform:translateX(0);transform:translateX(0)}.slideLeft.out.trigger{-webkit-transform:translateX(-100%);transform:translateX(-100%)}.slideDown.in.prepare{-webkit-transform:translateY(-100%);transform:translateY(-100%)}.slideDown.in.trigger{-webkit-transform:translateY(0);transform:translateY(0)}.slideDown.out.trigger{-webkit-transform:translateY(100%);transform:translateY(100%)}.slideUp.in.prepare{-webkit-transform:translateY(100%);transform:translateY(100%)}.slideUp.in.trigger{-webkit-transform:translateY(0);transform:translateY(0)}.slideUp.out.trigger{-webkit-transform:translateY(-100%);transform:translateY(-100%)}');
// Api/api.js
(function () {
    TC.registerModel = function () {
        var environment = TC.scriptEnvironment || {};
        
        var context = environment.context || TC.context();
        var args = TC.Utils.arguments(arguments);
        
        var constructor = args.func;
        var options = args.object;
        var path = args.string || environment.resourcePath;
        
        context.models.register(path, constructor, options);
    };

    TC.run = function(preload, model) {
        if (preload) {
            var promises = [];
            var context = TC.context();

            if ($.isArray(preload))
                for (var i = 0, l = preload.length; i < l; i++)
                    addPromise(preload[i]);
            else if(preload.constructor === String)
                addPromise(preload);
            
            function addPromise(path) {
                promises.push(context.loader.get(TC.Path(context.options.basePath).combine(path).toString(), null, context));
            }

            return $.when.apply(null, promises).done(function () {
                ko.applyBindings(model);
            });
        } else
            ko.applyBindings(model);
    };
})(); 
// Api/context.js
(function () {
    var staticState;

    TC.context = function (source) {
        staticState = staticState || {
            models: new TC.Types.Models(),
            loader: new TC.Types.Loader(),
            options: TC.options,
            templates: new TC.Types.Templates(),
            loadedPanes: {},
            pubsub: Tribe.PubSub && new Tribe.PubSub({ sync: TC.options.synchronous, handleExceptions: TC.options.handleExceptions })
        };
        var perContextState = {
            renderOperation: new TC.Types.Operation()
        };
        return $.extend({}, staticState, perContextState, source);
    };
})();

// Api/defaultUrlProvider.js
TC.options.defaultUrlProvider = {
    urlDataFrom: function(paneOptions) {
        return null;
    },
    paneOptionsFrom: function(url) {
        return null;
    }
};
// Api/nodes.js
(function () {
    var utils = TC.Utils;

    TC.createNode = function (element, paneOptions, parentNode, context) {
        parentNode = parentNode || TC.nodeFor(element);
        context = context || utils.contextFor(element) || TC.context();

        var node = new TC.Types.Node(parentNode);
        utils.bindPane(node, element, paneOptions, context);

        return node;
    };

    TC.appendNode = function (target, paneOptions, parentNode, context) {
        var element = $('<div/>').appendTo(target);
        return TC.createNode(element, paneOptions, parentNode, context);
    };

    TC.insertNodeAfter = function (target, paneOptions, parentNode, context) {
        var element = $('<div/>').insertAfter(target);
        return TC.createNode(element, paneOptions, parentNode || TC.nodeFor(target), context);
    };

    TC.nodeFor = function (element) {
        return element && TC.Utils.extractNode(ko.contextFor($(element)[0]));
    };
})();

// BindingHandlers/navigate.js
ko.bindingHandlers.navigate = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var node = TC.nodeFor(element);
        if (!node) return;

        var data = TC.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);
        var handler = ko.bindingHandlers.validatedClick || ko.bindingHandlers.click;
        handler.init(element, navigate, allBindingsAccessor, viewModel);

        function navigate() {
            return function () {
                node.navigate(data.value, TC.Utils.cloneData(data.data));
            };
        }
    }
};
// BindingHandlers/navigateBack.js
ko.bindingHandlers.navigateBack = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var node = TC.nodeFor(element);
        if (!node) return;

        ko.bindingHandlers.click.init(element, navigateBack, allBindingsAccessor, viewModel);

        function navigateBack() {
            return function () {
                node.navigateBack();
            };
        }
    }
};
// BindingHandlers/pane.js
(function() {
    ko.bindingHandlers.pane = { init: updateBinding };

    function updateBinding(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        TC.createNode(element, constructPaneOptions(), TC.Utils.extractNode(bindingContext), TC.Utils.extractContext(bindingContext));

        return { controlsDescendantBindings: true };

        function constructPaneOptions() {
            return TC.Utils.getPaneOptions(ko.utils.unwrapObservable(valueAccessor()), allBindingsAccessor());
        }
    }
})();

// BindingHandlers/publish.js
ko.bindingHandlers.publish = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var pubsub = TC.nodeFor(element).pane.pubsub;
        if (!pubsub) return;

        var data = TC.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);
        var handler = ko.bindingHandlers.validatedClick || ko.bindingHandlers.click;
        handler.init(element, publishAccessor, allBindingsAccessor, viewModel);

        function publishAccessor() {
            return function () {
                pubsub.publish(data.value, TC.Utils.cloneData(data.data));
            };
        }
    }
};
// Loggers/console.js
TC.Loggers.console = function(level, message) {
    if (window.console && window.console.log)
        window.console.log(level.toUpperCase() + ': ' + message);
};
