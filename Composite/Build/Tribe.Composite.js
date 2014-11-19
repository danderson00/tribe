/*! The Tribe platform is licensed under the MIT license. See http://tribejs.com/ for more information. */
// setup.js
(function (global) {
    if (typeof ($) === 'undefined')
        throw 'jQuery must be loaded before knockout.composite can initialise';
    if (typeof (ko) === 'undefined')
        throw 'knockout.js must be loaded before knockout.composite can initialise';

    global.T = global.T || {};
    global.T.Events = {};
    global.T.Factories = {};
    global.T.LoadHandlers = {};
    global.T.LoadStrategies = {};
    global.T.Transitions = {};
    global.T.Types = {};
    global.T.Utils = {};

    $(function() {
        $('head').append('<style class="__tribe">.__rendering { position: fixed; top: -10000px; left: -10000px; }</style>');
    });
})(window || this);

// options.js
T.defaultOptions = function() {
    return {
        synchronous: false,
        handleExceptions: true,
        basePath: '',
        loadStrategy: 'adhoc',
        events: ['loadResources', 'createPubSub', 'createModel', 'initialiseModel', 'renderPane', 'renderComplete', 'active', 'dispose']
    };
};
T.options = T.defaultOptions();

// logger.js
var level = 4;
var levels = {
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    none: 0
};

T.logger = {
    setLevel: function (newLevel) {
        level = levels[newLevel];
        if (level === undefined) level = 4;
    },
    debug: function (message) {
        if (level >= 4)
            console.log(('DEBUG: ' + message));
    },
    info: function (message) {
        if (level >= 3)
            console.info(('INFO: ' + message));
    },
    warn: function (message) {
        if (level >= 2)
            console.warn(('WARN: ' + message));
    },
    error: function (message, error) {
        if (level >= 1)
            console.error(('ERROR: ' + message + '\n'), T.logger.errorDetails(error));
    },
    errorDetails: function (ex) {
        if (!ex) return '';
        return (ex.constructor === String) ? ex :
            (ex.stack || '') + (ex.inner ? '\n\n' + this.errorDetails(ex.inner) : '\n');
    },
    log: function (message) {
        console.log(message);
    }
};

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
})(T.Utils);

// Utilities/deparam.js
// this is taken from https://github.com/cowboy/jquery-bbq/, Copyright (c) 2010 "Cowboy" Ben Alman and also released under the MIT license

// Deserialize a params string into an object, optionally coercing numbers,
// booleans, null and undefined values; this method is the counterpart to the
// internal jQuery.param method.
T.Utils.deparam = function (params, coerce) {
    var decode = decodeURIComponent;
    var obj = {},
      coerce_types = { 'true': !0, 'false': !1, 'null': null };

    // Iterate over all name=value pairs.
    $.each(params.replace(/\+/g, ' ').split('&'), function (j, v) {
        var param = v.split('='),
          key = decode(param[0]),
          val,
          cur = obj,
          i = 0,

          // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
          // into its component parts.
          keys = key.split(']['),
          keys_last = keys.length - 1;

        // If the first keys part contains [ and the last ends with ], then []
        // are correctly balanced.
        if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
            // Remove the trailing ] from the last keys part.
            keys[keys_last] = keys[keys_last].replace(/\]$/, '');

            // Split first keys part into two parts on the [ and add them back onto
            // the beginning of the keys array.
            keys = keys.shift().split('[').concat(keys);

            keys_last = keys.length - 1;
        } else {
            // Basic 'foo' style key.
            keys_last = 0;
        }

        // Are we dealing with a name=value pair, or just a name?
        if (param.length === 2) {
            val = decode(param[1]);

            // Coerce values.
            if (coerce) {
                val = val && !isNaN(val) ? +val              // number
                  : val === 'undefined' ? undefined         // undefined
                  : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
                  : val;                                                // string
            }

            if (keys_last) {
                // Complex key, build deep object structure based on a few rules:
                // * The 'cur' pointer starts at the object top-level.
                // * [] = array push (n is set to array length), [n] = array if n is 
                //   numeric, otherwise object.
                // * If at the last keys part, set the value.
                // * For each keys part, if the current level is undefined create an
                //   object or array based on the type of the next keys part.
                // * Move the 'cur' pointer to the next level.
                // * Rinse & repeat.
                for (; i <= keys_last; i++) {
                    key = keys[i] === '' ? cur.length : keys[i];
                    cur = cur[key] = i < keys_last
                      ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : [])
                      : val;
                }

            } else {
                // Simple key, even simpler rules, since only scalars and shallow
                // arrays are allowed.

                if ($.isArray(obj[key])) {
                    // val is already an array, so push on the next value.
                    obj[key].push(val);

                } else if (obj[key] !== undefined) {
                    // val isn't an array, but since a second value has been specified,
                    // convert val into an array.
                    obj[key] = [obj[key], val];

                } else {
                    // val is a scalar.
                    obj[key] = val;
                }
            }

        } else if (key) {
            // No value was defined, so set something meaningful.
            obj[key] = coerce
              ? undefined
              : '';
        }
    });

    return obj;
};
// Utilities/embeddedContext.js
(function() {
    T.Utils.embedState = function (model, context, node) {
        embedProperty(model, 'context', context);
        embedProperty(model, 'node', node);
    };

    T.Utils.contextFor = function (element) {
        return element && T.Utils.extractContext(ko.contextFor($(element)[0]));
    };

    T.Utils.extractContext = function (koBindingContext) {
        return koBindingContext && embeddedProperty(koBindingContext.$root, 'context');
    };

    T.Utils.extractNode = function (koBindingContext) {
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
    T.Utils.elementDestroyed = function (element) {
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
    T.Utils.raiseDocumentEvent = function (name, eventData) {
        var e = $.Event(name);
        e.eventData = eventData;
        $(document).trigger(e);
    };

    var handlers = {};

    // if a handler is used for more than one event, a leak will occur
    T.Utils.handleDocumentEvent = function (name, handler) {
        $(document).on(name, internalHandler);
        handlers[handler] = internalHandler;
        
        function internalHandler(e) {
            handler(e.originalEvent || e);
        }
    };

    T.Utils.detachDocumentEvent = function (name, handler) {
        $(document).off(name, handlers[handler]);
        delete handlers[handler];
    };
})();
// Utilities/exceptions.js
T.Utils.tryCatch = function(func, args, handleExceptions, message) {
    if (handleExceptions)
        try {
            func.apply(this, args || []);
        } catch (ex) {
            T.logger.error(message, ex);
        }
    else
        func.apply(this, args || []);
};
// Utilities/idGenerator.js
(function () {
    T.Utils.idGenerator = function () {
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

    var generator = T.Utils.idGenerator();
    T.Utils.getUniqueId = function () {
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
(function () {
    var oldClean = $.cleanData;

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
})();
// Utilities/knockout.js
T.Utils.cleanElement = function (element) {
    // prevent knockout from calling cleanData 
    // - calls to this function ultimately result from cleanData being called by jQuery, so a loop will occur
    var func = $.cleanData;
    $.cleanData = undefined;
    ko.cleanNode(element);
    $.cleanData = func;
};
// Utilities/objects.js
T.Utils.arguments = function (args) {
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

T.Utils.removeItem = function (array, item) {
    var index = $.inArray(item, array);
    if (index > -1)
        array.splice(index, 1);
};

T.Utils.inheritOptions = function (from, to, options) {
    for (var i = 0, l = options.length; i < l; i++)
        to[options[i]] = from[options[i]];
    return to;
};

T.Utils.cloneData = function (from, except) {
    if (!from || typeof from !== "object") return from;
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

T.Utils.normaliseBindings = function (valueAccessor, allBindingsAccessor) {
    var data = allBindingsAccessor();
    data.value = valueAccessor();
    if (!ko.isObservable(data.value) && $.isFunction(data.value))
        data.value = data.value();
    return data;
};


// Utilities/panes.js
(function () {
    var utils = T.Utils;

    utils.getPaneOptions = function(value, otherOptions) {
        var options = value.constructor === String ? { path: value } : value;
        return $.extend({}, otherOptions, options);
    };

    utils.bindPane = function (node, element, paneOptions, context) {
        context = context || utils.contextFor(element) || T.context();
        var pane = new T.Types.Pane($.extend({ element: $(element)[0] }, paneOptions));
        node.setPane(pane);

        context.renderOperation.add(pane);

        var pipeline = new T.Types.Pipeline(T.Events, context);
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
    T.Path = Path;

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

    T.Utils.Querystring = T.Utils.Querystring || {};

    T.Utils.Querystring.parse = function (source, seperator, eqSymbol) {
        stripLeadIn();
        
        return T.Utils.reduce(
            T.Utils.map(
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

    T.Utils.Querystring = T.Utils.Querystring || {};

    var escape = encodeURIComponent;

    T.Utils.Querystring.stringify = function (source, options) {
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
                throw new Error("T.Utils.Querystring.stringify: cyclical reference");

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

// Types/History.js
T.Types.History = function (history) {
    var currentState = 0;
    history.replaceState(currentState, window.title);

    var popActions = {
        raiseEvent: function (e) {
            T.Utils.raiseDocumentEvent('browser.go', { count: (e.state - currentState) });
            currentState = e.state;
        },
        updateStack: function(e) {
            currentState = e.state;
            currentAction = popActions.raiseEvent;
        }
    };
    var currentAction = popActions.raiseEvent;

    // this leaves IE7 & 8 high and dry. We'll probably require a polyfill and create a generic event subscription method
    if(window.addEventListener)
        window.addEventListener('popstate', executeCurrentAction);

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
        window.removeEventListener('popstate', executeCurrentAction);
    };
};

if (window.history.pushState)
    T.history = new T.Types.History(window.history);
else
    T.history = new T.Types.History({
        replaceState: function () { },
        pushState: function () { },
        go: function () { }
    });
// Types/Loader.js
T.Types.Loader = function () {
    var self = this;
    var resources = {};

    this.get = function(url, resourcePath, context) {
        if (resources[url] !== undefined)
            return resources[url];

        var extension = T.Path(url).extension().toString();
        var handler = T.LoadHandlers[extension];

        if (handler) {
            var result = handler(url, resourcePath, context);
            resources[url] = result;
            
            $.when(result).always(function() {
                resources[url] = null;
            });
            
            return result;
        }

        T.logger.warn("Resource of type " + extension + " but no handler registered.");
        return null;
    };
};

// Types/Navigation.js
T.Types.Navigation = function (node, options) {
    normaliseOptions();
    setInitialPaneState();

    var stack = [initialStackItem()];
    var currentFrame = 0;

    this.node = node;
    this.stack = stack;

    this.navigate = function (paneOptions) {
        if (options.browser)
            T.history.navigate(options.browser && options.browser.urlDataFrom(paneOptions));

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
        if (options.browser) T.history.update(frameCount);
    };
    
    if(options.browser) T.Utils.handleDocumentEvent('browser.go', onBrowserGo);
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
        T.Utils.raiseDocumentEvent('navigating', { node: node, options: paneOptions, browserData: options.browserData });
        node.transitionTo(paneOptions, options.transition, reverse);
    }

    function trimStack() {
        stack.splice(currentFrame + 1, stack.length);
    }

    this.dispose = function() {
        T.Utils.detachDocumentEvent('browser.go', onBrowserGo);
    };
    
    function normaliseOptions() {
        options = options || {};
        if (options.constructor === String)
            options = { transition: options };
        if (options.browser === true)
            options.browser = T.options.defaultUrlProvider;
    }
    
    function setInitialPaneState() {
        var query = window.location.href.match(/\#.*/);
        if (query) query = query[0].substring(1);
        var urlState = options.browser && options.browser.paneOptionsFrom(query);
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
T.Types.Node = function (parent, pane) {
    this.parent = parent;
    this.children = [];
    this.root = parent ? parent.root : this;
    this.id = T.Utils.getUniqueId();

    if (parent) parent.children.push(this);
    if (pane) this.setPane(pane);
};

T.Types.Node.prototype.navigate = function (pathOrPane, data) {
    var paneOptions = T.Utils.getPaneOptions(pathOrPane, { data: data });
    if (!T.Path(paneOptions.path).isAbsolute())
        // this is duplicated in Pane.inheritPathFrom - the concept (relative paths inherit existing paths) needs to be clearer
        paneOptions.path = T.Path(this.nodeForPath().pane.path).withoutFilename().combine(paneOptions.path).toString();
    
    this.findNavigation().navigate(paneOptions);
};

T.Types.Node.prototype.navigateBack = function () {
    this.findNavigation().go(-1);
};

T.Types.Node.prototype.findNavigation = function() {
    if (this.defaultNavigation)
        return this.defaultNavigation;

    else if (this.navigation)
        return this.navigation;
        
    if (!this.parent) {
        this.navigation = new T.Types.Navigation(this);
        return this.navigation;
    }

    return this.parent.findNavigation();
};

T.Types.Node.prototype.transitionTo = function(paneOptions, transition, reverse) {
    T.transition(this, transition, reverse).to(paneOptions);
};

T.Types.Node.prototype.setPane = function (pane) {
    if (this.pane)
        this.pane.node = null;

    pane.node = this;
    this.pane = pane;
    this.skipPath = pane.skipPath;

    if (pane.handlesNavigation) {
        this.navigation = new T.Types.Navigation(this, pane.handlesNavigation);
        
        // this sets this pane as the "default", accessible from panes outside the tree. Last in best dressed.
        this.root.defaultNavigation = this.navigation;
    }

    pane.inheritPathFrom(this.parent);
};

T.Types.Node.prototype.nodeForPath = function() {
    return this.skipPath && this.parent ? this.parent.nodeForPath() : this;
};

T.Types.Node.prototype.dispose = function() {
    if (this.root.defaultNavigation === this.navigation)
        this.root.defaultNavigation = null;

    if (this.parent)
        T.Utils.removeItem(this.parent.children, this);

    if (this.pane && this.pane.dispose) {
        delete this.pane.node;
        this.pane.dispose();
    }
};

// Types/Operation.js
T.Types.Operation = function () {
    var self = this;
    var incomplete = [];

    this.promise = $.Deferred();

    this.add = function(id) {
        incomplete.push(id);
    };

    this.complete = function (id) {
        T.Utils.removeItem(incomplete, id);
        if (incomplete.length === 0)
            self.promise.resolve();
    };
    
};
// Types/Pane.js
T.Types.Pane = function (options) {
    T.Utils.inheritOptions(options, this, ['path', 'data', 'element', 'transition', 'reverseTransitionIn', 'handlesNavigation', 'pubsub', 'id', 'skipPath']);

    // events we are interested in hooking in to - this could be done completely generically by the pipeline
    this.is = {
        rendered: $.Deferred(),
        disposed: $.Deferred()
    };    
};

T.Types.Pane.prototype.navigate = function (pathOrPane, data) {
    this.node && this.node.navigate(pathOrPane, data);
};

T.Types.Pane.prototype.navigateBack = function () {
    this.node && this.node.navigateBack();
};

T.Types.Pane.prototype.remove = function () {
    $(this.element).remove();
};

T.Types.Pane.prototype.dispose = function () {
    if (this.model && this.model.dispose)
        this.model.dispose();

    if (this.node) {
        delete this.node.pane;
        this.node.dispose();
    }

    if (this.element)
        T.Utils.cleanElement(this.element);
};

T.Types.Pane.prototype.inheritPathFrom = function (node) {
    node = node && node.nodeForPath();
    var pane = node && node.pane;    
    var path = T.Path(this.path);
    if (path.isAbsolute() || !pane)
        this.path = path.makeAbsolute().toString();
    else
        this.path = T.Path(pane.path).withoutFilename().combine(path).toString();
};

T.Types.Pane.prototype.find = function(selector) {
    return $(this.element).find(selector);
};

T.Types.Pane.prototype.startRender = function () {
    $(this.element).addClass('__rendering');
};

T.Types.Pane.prototype.endRender = function () {
    $(this.element).removeClass('__rendering');
};

T.Types.Pane.prototype.toString = function () {
    return "{ path: '" + this.path + "' }";
};

T.Types.Pane.prototype.startActor = function(path, args) {
    var actor = T.context().actors[path];
    this.pubsub.startActor.apply(this.pubsub, [actor.constructor].concat(Array.prototype.slice.call(arguments, 1)));
};


// Types/Pipeline.js
T.Types.Pipeline = function (events, context) {
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
                T.logger.warn("No event defined for " + eventName);
                executeNextEvent();
                return;
            }

            // could possibly improve debugging in non-production scenarios by omitting the fail handler
            // using .done without a fail handler should mean the exception is unhandled, allowing it
            // to be caught by the debugger easily.
            $.when(thisEvent(target, context))
                .done(executeNextEvent)
                .fail(handleFailure);

            function handleFailure(error) {
                promise.reject(error);
                var targetDescription = target ? target.toString() : "empty target";
                T.logger.error("An error occurred in the '" + eventName + "' event for " + targetDescription, error);
            }
        }

        return promise;
    };
};
// Types/Resources.js
T.Types.Resources = function () { };

T.Types.Resources.prototype.register = function (resourcePath, constructor, options) {
    this[resourcePath] = {
        constructor: constructor,
        options: options || {}
    };
    T.logger.debug("Model loaded for " + resourcePath);
};
// Types/Templates.js
T.Types.Templates = function () {
    var self = this;

    this.store = function (template, path) {
        var id = T.Path(path).asMarkupIdentifier().toString();
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
        return $('head script#template-' + T.Path(path).asMarkupIdentifier()).length > 0;
    };

    this.render = function (target, path) {
        var id = T.Path(path).asMarkupIdentifier();
        // can't use html() to append - this uses the element innerHTML property and IE7 and 8 will strip comments (i.e. containerless control flow bindings)
        $(target).empty().append($('head script#template-' + id).html());
    };
};
// Events/active.js
T.Events.active = function (pane, context) {
    return T.Utils.elementDestroyed(pane.element);
};
// Events/createModel.js
T.Events.createModel = function (pane, context) {
    var definition = context.models[pane.path];
    var model = definition && definition.constructor ?
        new definition.constructor(pane) :
        { pane: pane, data: pane.data };

    T.Utils.embedState(model, context, pane.node);

    pane.model = model;
};
// Events/createPubSub.js
T.Events.createPubSub = function (pane, context) {
    if (context.pubsub)
        pane.pubsub = context.pubsub.createLifetime ?
            context.pubsub.createLifetime() :
            context.pubsub;
};

// Events/dispose.js
T.Events.dispose = function (pane, context) {
    pane.pubsub && pane.pubsub.end && pane.pubsub.end();
    pane.dispose();
    pane.is.disposed.resolve();
};

// Events/initialiseModel.js
T.Events.initialiseModel = function (pane, context) {
    if (pane.model.initialise)
        return pane.model.initialise();
    return null;
};
// Events/loadResources.js
T.Events.loadResources = function (pane, context) {
    var strategy = T.LoadStrategies[context.options.loadStrategy];
    
    if (!strategy)
        throw "Unknown resource load strategy";

    return strategy(pane, context);
};
// Events/renderComplete.js
T.Events.renderComplete = function (pane, context) {
    $.when(
        T.transition(pane, pane.transition, pane.reverseTransitionIn)['in']())
     .done(executeRenderComplete);
    
    pane.endRender();

    function executeRenderComplete() {
        if (pane.model.renderComplete)
            pane.model.renderComplete();
        pane.is.rendered.resolve();
        T.Utils.raiseDocumentEvent('renderComplete', pane);
        context.renderOperation = new T.Types.Operation();
    }
};
// Events/renderPane.js
T.Events.renderPane = function (pane, context) {
    var renderOperation = context.renderOperation;

    pane.startRender();
    context.templates.render(pane.element, pane.path);
    T.Utils.tryCatch(applyBindings, null, context.options.handleExceptions, 'An error occurred applying the bindings for ' + pane.toString());

    if (pane.model.paneRendered)
        pane.model.paneRendered();

    renderOperation.complete(pane);
    return renderOperation.promise;

    function applyBindings() {
        ko.applyBindingsToDescendants(pane.model, pane.element);
    }
};
// LoadHandlers/scripts.js
T.LoadHandlers.js = function (url, resourcePath, context) {
    return $.ajax({
        url: url,
        dataType: 'text',
        async: !context.options.synchronous,
        cache: false,
        success: executeScript
    });

    function executeScript(script) {
        T.scriptEnvironment = {
            url: url,
            resourcePath: resourcePath,
            context: context
        };

        T.Utils.tryCatch($.globalEval, [appendSourceUrl(script)], context.options.handleExceptions,
            'An error occurred executing script loaded from ' + url + (resourcePath ? ' for resource ' + resourcePath : ''));

        delete T.scriptEnvironment;

        T.logger.debug('Loaded script from ' + url);
    }

    function appendSourceUrl(script) {
        return script + '\n//@ sourceURL=tribe://Application/' + url.replace(/ /g, "_");
    }    
};
// LoadHandlers/stylesheets.js
T.LoadHandlers.css = function (url, resourcePath, context) {
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
T.LoadHandlers.htm = function (url, resourcePath, context) {
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
T.LoadHandlers.html = T.LoadHandlers.htm;

// LoadStrategies/adhoc.js
T.LoadStrategies.adhoc = function (pane, context) {
    if (context.loadedPanes[pane.path] !== undefined)
        return context.loadedPanes[pane.path];

    var path = T.Path(context.options.basePath).combine(T.Path(pane.path).makeRelative());

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
            T.logger.error("Unable to load resources for '" + pane.path + "'.");
        })
        .always(function () {
            context.loadedPanes[pane.path] = null;
        });

    return deferred;
};
// LoadStrategies/preloaded.js
T.LoadStrategies.preloaded = function (pane, context) {
    if (!context.models[pane.path] && !context.templates.loaded(pane.path)) {
        T.logger.error("No resources loaded for '" + pane.path + "'.");
        return $.Deferred().reject();
    }
    return null;
};
// Transitions/transition.js
T.transition = function (target, transition, reverse) {
    var node;
    var pane;
    var element;
    setState();
    
    transition = transition || (pane && pane.transition) || (node && node.transition);
    var implementation = T.Transitions[transition];
    if (reverse && implementation && implementation.reverse)
        implementation = T.Transitions[implementation.reverse];

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
            var context = T.context();
            if (node)
                T.Utils.insertPaneAfter(node, element, T.Utils.getPaneOptions(paneOptions, { transition: transition, reverseTransitionIn: reverse }), context);
            else
                T.insertNodeAfter(element, T.Utils.getPaneOptions(paneOptions, { transition: transition, reverseTransitionIn: reverse }), null, context);
            this.out(remove);
            return context.renderOperation.promise;
        }
    };
    
    function setTransitionMode() {
        var $element = $(element);
        if (T.transition.mode === 'fixed')
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
        if (!target) throw "No target passed to T.transition";
        
        if (target.constructor === T.Types.Node) {
            node = target;
            pane = node.pane;
            element = pane.element;
        } else if (target.constructor === T.Types.Pane) {
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
        T.Transitions[transition] = {
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
    T.registerModel = function () {
        addResource('models', T.Utils.arguments(arguments));
    };

    T.registerActor = function () {
        addResource('actors', T.Utils.arguments(arguments));
    };
    
    function addResource(contextProperty, args) {
        var environment = T.scriptEnvironment || {};
        var context = environment.context || T.context();

        var path = args.string || environment.resourcePath;
        var constructor = args.func;
        var options = args.object;

        context[contextProperty].register(path, constructor, options);
    }

    T.run = function(options) {
        T.options = $.extend(T.options, options);
        T.options.pubsub = T.options.pubsub || new Tribe.PubSub({ sync: T.options.synchronous, handleExceptions: T.options.handleExceptions });
        ko.applyBindings();
    };
})(); 
// Api/context.js
(function () {
    var staticState;

    T.context = function (source) {
        staticState = staticState || {
            models: new T.Types.Resources(),
            actors: new T.Types.Resources(),
            loader: new T.Types.Loader(),
            options: T.options,
            templates: new T.Types.Templates(),
            loadedPanes: {}
        };
        var perContextState = {
            renderOperation: new T.Types.Operation(),
            pubsub: T.options.pubsub
        };
        return $.extend({}, staticState, perContextState, source);
    };
})();

// Api/defaultUrlProvider.js
T.options.defaultUrlProvider = {
    urlDataFrom: function(paneOptions) {
        return paneOptions && { url: '#' + $.param(paneOptions) };
    },
    paneOptionsFrom: function(url) {
        return url && T.Utils.deparam(url.substr(1));
    }
};
// Api/nodes.js
(function () {
    var utils = T.Utils;

    T.createNode = function (element, paneOptions, parentNode, context) {
        parentNode = parentNode || T.nodeFor(element);
        context = context || utils.contextFor(element) || T.context();

        var node = new T.Types.Node(parentNode);
        utils.bindPane(node, element, paneOptions, context);

        return node;
    };

    T.appendNode = function (target, paneOptions, parentNode, context) {
        var element = $('<div/>').appendTo(target);
        return T.createNode(element, paneOptions, parentNode, context);
    };

    T.insertNodeAfter = function (target, paneOptions, parentNode, context) {
        var element = $('<div/>').insertAfter(target);
        return T.createNode(element, paneOptions, parentNode || T.nodeFor(target), context);
    };

    T.nodeFor = function (element) {
        return element && T.Utils.extractNode(ko.contextFor($(element)[0]));
    };
})();

// BindingHandlers/foreachProperty.js
(function() {
    ko.bindingHandlers.foreachProperty = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            return ko.bindingHandlers.foreach.init(element, makeAccessor(mapToArray(valueAccessor())), allBindingsAccessor, viewModel, bindingContext);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            return ko.bindingHandlers.foreach.update(element, makeAccessor(mapToArray(valueAccessor())), allBindingsAccessor, viewModel, bindingContext);
        }
    };
    
    function makeAccessor(source) {
        return function() {
            return source;
        };
    }

    function mapToArray(source) {
        var result = [];
        for (var property in source)
            if (source.hasOwnProperty(property))
                // we don't want to modify the original object, extend it onto a new object
                result.push($.extend({ $key: property }, source[property]));
        return result;
    }
})();

// BindingHandlers/navigate.js
ko.bindingHandlers.navigate = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var node = T.nodeFor(element);
        if (!node) return;

        var data = T.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);
        var handler = ko.bindingHandlers.validatedClick || ko.bindingHandlers.click;
        handler.init(element, navigate, allBindingsAccessor, viewModel);

        function navigate() {
            return function () {
                node.navigate(data.value, T.Utils.cloneData(data.data));
            };
        }
    }
};
// BindingHandlers/navigateBack.js
ko.bindingHandlers.navigateBack = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var node = T.nodeFor(element);
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
        T.createNode(element, constructPaneOptions(), T.Utils.extractNode(bindingContext), T.Utils.extractContext(bindingContext));

        return { controlsDescendantBindings: true };

        function constructPaneOptions() {
            return T.Utils.getPaneOptions(ko.utils.unwrapObservable(valueAccessor()), allBindingsAccessor());
        }
    }
})();

// BindingHandlers/publish.js
ko.bindingHandlers.publish = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var pubsub = T.nodeFor(element).pane.pubsub;
        if (!pubsub) return;

        var data = T.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);
        var handler = ko.bindingHandlers.validatedClick || ko.bindingHandlers.click;
        handler.init(element, publishAccessor, allBindingsAccessor, viewModel, bindingContext);

        function publishAccessor() {
            return function () {
                pubsub.publish(data.value, T.Utils.cloneData(data.data));
            };
        }
    }
};
