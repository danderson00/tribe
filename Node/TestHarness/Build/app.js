require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
T.scriptEnvironment = { resourcePath: '/fixture' };
﻿T.registerModel(function (pane) {
    this.fixture = pane.data;
});
},{}],2:[function(require,module,exports){
T.scriptEnvironment = { resourcePath: '/layout' };
﻿T.registerModel(function (pane) {
    var self = this,
        saga,
        channel = pane.pubsub.channel('__test').connect();

    this.initialise = function () {
        return T.services('Tests').invoke().then(function (fixture) {
            fixture = require('operations').extendFixture(fixture);
            saga = channel.startSaga(null, 'session', fixture);
            self.fixture = fixture;
        });        
    };

    //this.renderComplete = function () {
    //    channel.publish('test.run');
    //};
});
},{"operations":7}],3:[function(require,module,exports){
T.scriptEnvironment = { resourcePath: '/list' };
﻿T.registerModel(function (pane) {
    this.tests = flatten(pane.data);

    // should write a test for this
    function flatten(fixture) {
        var tests = fixture.tests,
            fixtures = fixture.fixtures;

        for (var fixtureName in fixtures)
            if(fixtures.hasOwnProperty(fixtureName))
                tests = tests.concat(flatten(fixtures[fixtureName]));
        
        return tests;
        //return _.flatten(_.map(fixture.fixtures, flatten), fixture.tests);
    }
});
},{}],4:[function(require,module,exports){
T.scriptEnvironment = { resourcePath: '/test' };
﻿T.registerModel(function (pane) {
    var self = this,
        test = pane.data;

    this.test = test;

    this.error = ko.computed(function () {
        var error = test.error();
        return error && error.replace(/\n/g, '<br/>');
    });

    this.showDetails = ko.observable(test.state() === 'failed');

    this.toggleDetails = function () {
        self.showDetails(!self.showDetails());
    };

    this.run = function () {
        pane.pubsub.publish({ topic: 'test.run', data: [{ fixture: test.fixture, title: test.title }], channelId: '__test' });
    };

    this.select = function () {
        test.selected(!test.selected());
    };
});
},{}],5:[function(require,module,exports){
T.scriptEnvironment = { resourcePath: '/toolbar' };
﻿T.registerModel(function (pane) {
    this.run = function () {
        pane.pubsub.publish({ topic: 'test.run', channelId: '__test' });
    };

    this.debug = function () {
        var debugWindow = window.open('http://localhost:8080/debug?port=5859', 'debugger');
        debugWindow.focus();
    };
});
},{}],6:[function(require,module,exports){
T.scriptEnvironment = { resourcePath: '/session' };
﻿require('tribe/register').saga(function (saga) {
    var fixture;

    saga.handles = {
        onstart: function (data) {
            //fixture = extendFixture(data);
        },
        'test.complete': updateTest,
        'test.loaded': updateTest,
        //'test.removed': removeTest
    };

    function updateTest(update) {
        var test = findTest(update);
        test.stale(update.state === undefined);
        if(update.state) test.state(update.state);
        test.error(update.error);
        test.duration(update.duration);
    }
});

},{"tribe/register":"2OrlGQ"}],7:[function(require,module,exports){
var _ = require('underscore');

module.exports = {
    extendTest: function (test) {
        return {
            title: test.title,
            fixture: test.fixture,
            stale: ko.observable(true),
            state: ko.observable(test.state),
            error: ko.observable(test.error),
            duration: ko.observable(test.duration),
            selected: ko.observable(true)
        };
    },

    extendFixture: function (fixture) {
        return {
            title: fixture.title,
            fixtures: ko.observableArray(_.map(fixture.fixtures, module.exports.extendFixture)),
            tests: ko.observableArray(_.map(fixture.tests, module.exports.extendTest))
        };
    },

    createFixture: function (title, parent) {
        var fixture = {
            title: title,
            fixtures: ko.observableArray(),
            tests: ko.observableArray()
        };
        if (parent) parent.fixtures.push(fixture);
        return fixture;
    },

    createTest: function (from, fixture) {
        var test = this.extendTest(from);
        fixture.tests.push(test);
        return test;
    },

    removeTest: function (test, fixture) {
        fixture.tests.splice(fixture.tests.indexOf(test), 1);
    }
};

},{"underscore":12}],8:[function(require,module,exports){

window.eval("\nif (typeof (T) == 'undefined') T = {};\nT.Types = T.Types || {};\n\n//@ sourceURL=http://Tribe.Node/node_modules/tribe/client/setup.js");


window.eval("\n(function () {\n    Tribe.PubSub.prototype.startSaga = function (id, path, data) {\n        if (path.charAt(0) !== '/')\n            path = '/' + path;\n\n        var saga = new Tribe.PubSub.Saga(this, sagaDefinition(path));\n\n        if (id) {\n            saga.id = id;\n            attachToHub(saga);\n            T.hub.startSaga(path, id, data);\n        }\n\n        return saga.start(data);\n    };\n\n    Tribe.PubSub.prototype.joinSaga = function (id, path, data) {\n        var deferred = $.Deferred();\n        var self = this;\n        $.when($.get('Data/' + id + '/' + id))\n            .done(function (data) {\n                var saga = new Tribe.PubSub.Saga(self, sagaDefinition(data.path));\n                saga.id = id;\n                saga.join(T.serializer.deserialize(data.data));\n                attachToHub(saga);\n                deferred.resolve(saga);\n            })\n            .fail(function (reason) {\n                if (reason.status === 404 && path) {\n                    var saga = self.startSaga(id, path, data);\n                    deferred.resolve(saga);\n                }\n                else deferred.reject(reason);\n\n            });\n        return deferred;\n    };\n\n    function sagaDefinition(path) {\n        return T.context().sagas[path].constructor;\n    }\n\n    // need to also be able to detach\n    function attachToHub(saga) {\n        T.hub.join(saga.id);\n        saga.pubsub.subscribe(saga.topics, function (message, envelope) {\n            envelope.sagaId = saga.id;\n            T.hub.publish(envelope);\n        });\n    }\n\n    Tribe.PubSub.Lifetime.prototype.startSaga = Tribe.PubSub.prototype.startSaga;\n    Tribe.PubSub.Lifetime.prototype.joinSaga = Tribe.PubSub.prototype.joinSaga;\n    Tribe.PubSub.Channel.prototype.startSaga = Tribe.PubSub.prototype.startSaga;\n    Tribe.PubSub.Channel.prototype.joinSaga = Tribe.PubSub.prototype.joinSaga;\n\n    Tribe.PubSub.Channel.prototype.connect = function (topics) {\n        var self = this;\n\n        T.hub.join(this.id);\n        this.subscribe(topics || '*', function(data, envelope) {\n            T.hub.publish(envelope);\n        });\n\n        var end = this.end;\n        this.end = function() {\n            T.hub.leave(self.channelId);\n            end();\n        };\n\n        return this;\n    };\n})();\n\n//@ sourceURL=http://Tribe.Node/node_modules/tribe/client/PubSub.extensions.js");


window.eval("\nT.services = function (name) {\n    return {\n        invoke: function () {\n            return $.get('Services', { name: name, args: Array.prototype.splice.call(arguments, 0) })\n                .fail(function (response) {\n                    T.logger.error(response.responseText);\n                });\n        }\n    };\n};\n//@ sourceURL=http://Tribe.Node/node_modules/tribe/client/services.js");


window.eval("\nT.Types.Hub = function (io, pubsub, options) {\n    var socket = io.connect(options.socketUrl);\n\n    socket.on('message', function (envelope) {\n        envelope.origin = 'server';\n        pubsub.publish(envelope);\n    });\n\n    this.publish = function(envelope) {\n        if (!socket)\n            throw 'Hub must be connected before calling publish';\n        if(envelope.origin !== 'server')\n            socket.emit('message', envelope, function () {\n                console.log('message acknowledged');\n            });\n    };\n\n    this.join = function(channel) {\n        socket.emit('join', channel);\n    };\n\n    this.startSaga = function(path, id, data) {\n        socket.emit('startSaga', { path: path, id: id, data: data });\n    };\n};\n//@ sourceURL=http://Tribe.Node/node_modules/tribe/client/types/Hub.js");

},{}],9:[function(require,module,exports){
/*! The Tribe platform is licensed under the MIT license. See http://tribejs.com/ for more information. */


window.eval("\n(function () {\n    var level = 4;\n    var levels = {\n        debug: 4,\n        info: 3,\n        warn: 2,\n        error: 1,\n        none: 0\n    };\n\n    var api = {\n        setLevel: function (newLevel) {\n            level = levels[newLevel];\n            if (level === undefined) level = 4;\n        },\n        debug: function (message) {\n            if (level >= 4)\n                console.log(('DEBUG: ' + message));\n        },\n        info: function (message) {\n            if (level >= 3)\n                console.info(('INFO: ' + message));\n        },\n        warn: function (message) {\n            if (level >= 2)\n                console.warn(('WARN: ' + message));\n        },\n        error: function (message, error) {\n            if (level >= 1)\n                console.error(('ERROR: ' + message + '\\n'), api.errorDetails(error));\n        },\n        errorDetails: function (ex) {\n            if (!ex) return '';\n            return (ex.constructor === String) ? ex :\n                (ex.stack || '') + (ex.inner ? '\\n\\n' + this.errorDetails(ex.inner) : '\\n');\n        }\n    };\n    api.log = api.debug;\n    \n    if (typeof (exports) !== 'undefined' && typeof (module) !== 'undefined')\n        module.exports = api;\n    else {\n        if (typeof (T) === 'undefined')\n            T = {};\n        T.logger = api;\n    }\n})();\n\n\n//@ sourceURL=http://Tribe.Common/Source/logger.js");


window.eval("\n(function () {\n    // man... this cross-platform stuff sucks...\n    var ko;\n    if (typeof (window) !== 'undefined')\n        ko = window.ko;\n    if (typeof (require) !== 'undefined')\n        ko = require('knockout');\n\n    var api = {\n        serialize: function (source) {\n            return JSON.stringify(this.extractMetadata(source));\n        },\n        extractMetadata: function (source) {\n            var target = source,\n                metadata = {};\n            removeObservables();\n            return {\n                target: target,\n                metadata: metadata\n            };\n\n            function removeObservables() {\n                metadata.observables = [];\n                for (var property in target)\n                    if (target.hasOwnProperty(property) && ko.isObservable(target[property])) {\n                        target[property] = target[property]();\n                        metadata.observables.push(property);\n                    }\n\n            }\n        },\n        deserialize: function (source) {\n            source = JSON.parse(source);\n            if (source.target)\n                return this.applyMetadata(source.target, source.metadata);\n            return source;\n        },\n        applyMetadata: function (target, metadata) {\n            if (metadata)\n                restoreObservables();\n            return target;\n\n            function restoreObservables() {\n                var observables = metadata.observables;\n                for (var i = 0, l = observables.length; i < l; i++)\n                    restoreProperty(observables[i]);\n            }\n\n            function restoreProperty(property) {\n                target[property] = createObservable(target[property]);\n            }\n\n            function createObservable(value) {\n                return value.constructor === Array ?\n                    ko.observableArray(value) :\n                    ko.observable(value);\n            }\n        }\n    };\n\n    if (typeof (exports) !== 'undefined' && typeof (module) !== 'undefined')\n        module.exports = api;\n    else {\n        if (typeof (T) === 'undefined')\n            T = {};\n        T.serializer = api;\n    }\n})();\n\n//@ sourceURL=http://Tribe.Common/Source/serializer.js");


window.eval("\nif (typeof (Tribe) === 'undefined')\n    Tribe = {};\n\nTribe.PubSub = function (options) {\n    var self = this;\n    var utils = Tribe.PubSub.utils;\n\n    this.owner = this;\n    this.options = options || {};\n    this.sync = option('sync');\n     \n    var subscribers = new Tribe.PubSub.SubscriberList();\n    this.subscribers = subscribers;\n\n    function publish(envelope) {\n        var messageSubscribers = subscribers.get(envelope.topic);\n        var sync = envelope.sync === true || self.sync === true;\n\n        for (var i = 0, l = messageSubscribers.length; i < l; i++) {\n            if (sync)\n                executeSubscriber(messageSubscribers[i].handler);\n            else {\n                (function (subscriber) {\n                    setTimeout(function () {\n                        executeSubscriber(subscriber.handler);\n                    });\n                })(messageSubscribers[i]);\n            }\n        }\n\n        function executeSubscriber(func) {\n            var exceptionHandler = option('exceptionHandler');\n            \n            if(option('handleExceptions')  && exceptionHandler)\n                try {\n                    func(envelope.data, envelope);\n                } catch (e) {\n                    exceptionHandler(e, envelope);\n                }\n            else\n                func(envelope.data, envelope);\n        }\n    }\n\n    this.publish = function (topicOrEnvelope, data) {\n        return publish(createEnvelope(topicOrEnvelope, data));\n    };\n\n    this.publishSync = function (topicOrEnvelope, data) {\n        var envelope = createEnvelope(topicOrEnvelope, data);\n        envelope.sync = true;\n        return publish(envelope);\n    };\n    \n    function createEnvelope(topicOrEnvelope, data) {\n        return topicOrEnvelope && topicOrEnvelope.topic\n            ? topicOrEnvelope\n            : { topic: topicOrEnvelope, data: data };\n    }\n\n    this.subscribe = function (topic, func) {\n        if (typeof (topic) === \"string\")\n            return subscribers.add(topic, func);\n        else if (utils.isArray(topic))\n            return utils.map(topic, function(topicName) {\n                return subscribers.add(topicName, func);\n            });\n        else\n            return utils.map(topic, function (individualFunc, topicName) {\n                return subscribers.add(topicName, individualFunc);\n            });\n    };\n\n    this.unsubscribe = function (tokens) {\n        if (Tribe.PubSub.utils.isArray(tokens)) {\n            var results = [];\n            for (var i = 0, l = tokens.length; i < l; i++)\n                results.push(subscribers.remove(tokens[i]));\n            return results;\n        }\n\n        return subscribers.remove(tokens);\n    };\n\n    this.createLifetime = function() {\n        return new Tribe.PubSub.Lifetime(self, self);\n    };\n\n    this.channel = function(channelId) {\n        return new Tribe.PubSub.Channel(self, channelId);\n    };\n    \n    function option(name) {\n        return (self.options.hasOwnProperty(name)) ? self.options[name] : Tribe.PubSub.options[name];\n    }\n};\n//@ sourceURL=http://Tribe.PubSub/PubSub.js");


window.eval("\nTribe.PubSub.Channel = function (pubsub, channelId) {\n    var self = this;\n    pubsub = pubsub.createLifetime();\n\n    this.id = channelId;\n    this.owner = pubsub.owner;\n\n    this.publish = function (topicOrEnvelope, data) {\n        return pubsub.publish(createEnvelope(topicOrEnvelope, data));\n    };\n\n    this.publishSync = function (topicOrEnvelope, data) {\n        return pubsub.publishSync(createEnvelope(topicOrEnvelope, data));\n    };\n\n    this.subscribe = function(topic, func) {\n        return pubsub.subscribe(topic, filterMessages(func));\n    };\n\n    this.subscribeOnce = function(topic, func) {\n        return pubsub.subscribeOnce(topic, filterMessages(func));\n    };\n    \n    this.unsubscribe = function(token) {\n        return pubsub.unsubscribe(token);\n    };\n\n    this.end = function() {\n        return pubsub.end();\n    };\n\n    this.createLifetime = function () {\n        return new Tribe.PubSub.Lifetime(self, self.owner);\n    };\n\n    function createEnvelope(topicOrEnvelope, data) {\n        var envelope = topicOrEnvelope && topicOrEnvelope.topic\n          ? topicOrEnvelope\n          : { topic: topicOrEnvelope, data: data };\n        envelope.channelId = channelId;\n        return envelope;\n    }\n    \n    function filterMessages(func) {\n        return function(data, envelope) {\n            if (envelope.channelId === channelId)\n                func(data, envelope);\n        };\n    }\n};\n//@ sourceURL=http://Tribe.PubSub/Channel.js");


window.eval("\nTribe.PubSub.Lifetime = function (parent, owner) {\n    var self = this;\n    var tokens = [];\n\n    this.owner = owner;\n\n    this.publish = function(topicOrEnvelope, data) {\n        return parent.publish(topicOrEnvelope, data);\n    };\n\n    this.publishSync = function(topic, data) {\n        return parent.publishSync(topic, data);\n    };\n\n    this.subscribe = function(topic, func) {\n        var token = parent.subscribe(topic, func);\n        return recordToken(token);\n    };\n\n    this.subscribeOnce = function(topic, func) {\n        var token = parent.subscribeOnce(topic, func);\n        return recordToken(token);\n    };\n    \n    this.unsubscribe = function(token) {\n        // we should really remove the token(s) from our token list, but it has trivial impact if we don't\n        return parent.unsubscribe(token);\n    };\n\n    this.channel = function(channelId) {\n        return new Tribe.PubSub.Channel(self, channelId);\n    };\n\n    this.end = function() {\n        return parent.unsubscribe(tokens);\n    };\n\n    this.createLifetime = function() {\n        return new Tribe.PubSub.Lifetime(self, self.owner);\n    };\n    \n    function recordToken(token) {\n        if (Tribe.PubSub.utils.isArray(token))\n            tokens = tokens.concat(token);\n        else\n            tokens.push(token);\n        return token;\n    }\n};\n//@ sourceURL=http://Tribe.PubSub/Lifetime.js");


window.eval("\nTribe.PubSub.options = {\n    sync: false,\n    handleExceptions: true,\n    exceptionHandler: function(e, envelope) {\n        typeof(console) !== 'undefined' && console.log(\"Exception occurred in subscriber to '\" + envelope.topic + \"': \" + e.message);\n    }\n};\n//@ sourceURL=http://Tribe.PubSub/options.js");


window.eval("\nTribe.PubSub.Saga = function (pubsub, definition) {\n    var self = this;\n    var utils = Tribe.PubSub.utils;\n\n    pubsub = pubsub.createLifetime();\n    this.pubsub = pubsub;\n    this.children = [];\n\n    configureSaga();\n    var handlers = this.handles || {};\n\n    // this is not ie<9 compatible and includes onstart / onend\n    this.topics = Object.keys(handlers);\n\n    this.start = function (startData) {\n        utils.each(handlers, self.addHandler, self);\n        if (handlers.onstart) handlers.onstart(startData, self);\n        return self;\n    };\n\n    this.startChild = function (child, onstartData) {\n        self.children.push(new Tribe.PubSub.Saga(pubsub, child)\n            .start(onstartData));\n        return self;\n    };\n\n    this.join = function (data, onjoinData) {\n        utils.each(handlers, self.addHandler, self);\n        self.data = data;\n        if (handlers.onjoin) handlers.onjoin(onjoinData, self);\n        return self;\n    };\n\n    this.end = function (onendData) {\n        if (handlers.onend) handlers.onend(onendData, self);\n        pubsub.end();\n        self.endChildren(onendData);\n        return self;\n    };\n\n    this.endChildren = function(data) {\n        Tribe.PubSub.utils.each(self.children, function(child) {\n             child.end(data);\n        });\n    }\n    \n    function configureSaga() {\n        if (definition)\n            if (definition.constructor === Function)\n                definition(self);\n            else\n                Tribe.PubSub.utils.copyProperties(definition, self, ['handles', 'endsChildrenExplicitly']);\n    }\n};\n\nTribe.PubSub.Saga.startSaga = function (definition, data) {\n    return new Tribe.PubSub.Saga(this, definition).start(data);\n};\n\nTribe.PubSub.prototype.startSaga = Tribe.PubSub.Saga.startSaga;\nTribe.PubSub.Lifetime.prototype.startSaga = Tribe.PubSub.Saga.startSaga;\n//@ sourceURL=http://Tribe.PubSub/Saga.core.js");


window.eval("\nTribe.PubSub.Saga.prototype.addHandler = function (handler, topic) {\n    var self = this;\n\n    if (topic !== 'onstart' && topic !== 'onend' && topic !== 'onjoin')\n        if (!handler)\n            this.pubsub.subscribe(topic, endHandler());\n        else if (handler.constructor === Function)\n            this.pubsub.subscribe(topic, messageHandlerFor(handler));\n        else\n            this.pubsub.subscribe(topic, childHandlerFor(handler));\n\n    function messageHandlerFor(handler) {\n        return function (messageData, envelope) {\n            if (!self.endsChildrenExplicitly)\n                self.endChildren(messageData);\n            handler(messageData, envelope, self);\n        };\n    }\n\n    function childHandlerFor(childHandlers) {\n        return function (messageData, envelope) {\n            self.startChild({ handles: childHandlers }, messageData);\n        };\n    }\n\n    function endHandler() {\n        return function (messageData) {\n            self.end(messageData);\n        };\n    }\n};\n\n//@ sourceURL=http://Tribe.PubSub/Saga.handlers.js");


window.eval("\nTribe.PubSub.prototype.subscribeOnce = function (topic, handler) {\n    var self = this;\n    var utils = Tribe.PubSub.utils;\n    var lifetime = this.createLifetime();\n\n    if (typeof (topic) === \"string\")\n        return lifetime.subscribe(topic, wrapHandler(handler));\n    else if (utils.isArray(topic))\n        return lifetime.subscribe(wrapTopicArray());\n    else\n        return lifetime.subscribe(wrapTopicObject());\n\n    function wrapTopicArray() {\n        var result = {};\n        utils.each(topic, function(topicName) {\n            result[topicName] = wrapHandler(handler);\n        });\n        return result;\n    }\n    \n    function wrapTopicObject() {\n        return utils.map(topic, function (func, topicName) {\n            return lifetime.subscribe(topicName, wrapHandler(func));\n        });\n    }\n\n    function wrapHandler(func) {\n        return function() {\n            lifetime.end();\n            func.apply(self, arguments);\n        };\n    }\n};\n//@ sourceURL=http://Tribe.PubSub/subscribeOnce.js");


window.eval("\nTribe.PubSub.SubscriberList = function() {\n    var subscribers = {};\n    var lastUid = -1;\n\n    this.get = function (publishedTopic) {\n        var matching = [];\n        for (var registeredTopic in subscribers)\n            if (subscribers.hasOwnProperty(registeredTopic) && topicMatches(publishedTopic, registeredTopic))\n                matching = matching.concat(subscribers[registeredTopic]);\n        return matching;\n    };\n\n    this.add = function (topic, handler) {\n        var token = (++lastUid).toString();\n        if (!subscribers.hasOwnProperty(topic))\n            subscribers[topic] = [];\n        subscribers[topic].push({ topic: topic, handler: handler, token: token });\n        return token;\n    };\n\n    this.remove = function(token) {\n        for (var m in subscribers)\n            if (subscribers.hasOwnProperty(m))\n                for (var i = 0, l = subscribers[m].length; i < l; i++)\n                    if (subscribers[m][i].token === token) {\n                        subscribers[m].splice(i, 1);\n                        return token;\n                    }\n\n        return false;\n    };\n\n    function topicMatches(published, subscriber) {\n        if (subscriber === '*')\n            return true;\n        \n        var expression = \"^\" + subscriber\n            .replace(/\\./g, \"\\\\.\")\n            .replace(/\\*/g, \"[^\\.]*\") + \"$\";\n        return published.match(expression);\n    }\n};\n//@ sourceURL=http://Tribe.PubSub/SubscriberList.js");


window.eval("\nTribe.PubSub.utils = {};\n(function(utils) {\n    utils.isArray = function (source) {\n        return source.constructor === Array;\n    };\n\n    // The following functions are taken from the underscore library, duplicated to avoid dependency. License at http://underscorejs.org.\n    var nativeForEach = Array.prototype.forEach;\n    var nativeMap = Array.prototype.map;\n    var breaker = {};\n\n    utils.each = function (obj, iterator, context) {\n        if (obj == null) return;\n        if (nativeForEach && obj.forEach === nativeForEach) {\n            obj.forEach(iterator, context);\n        } else if (obj.length === +obj.length) {\n            for (var i = 0, l = obj.length; i < l; i++) {\n                if (iterator.call(context, obj[i], i, obj) === breaker) return;\n            }\n        } else {\n            for (var key in obj) {\n                if (obj.hasOwnProperty(key)) {\n                    if (iterator.call(context, obj[key], key, obj) === breaker) return;\n                }\n            }\n        }\n    };\n\n    utils.map = function (obj, iterator, context) {\n        var results = [];\n        if (obj == null) return results;\n        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);\n        utils.each(obj, function (value, index, list) {\n            results[results.length] = iterator.call(context, value, index, list);\n        });\n        return results;\n    };\n\n    utils.copyProperties = function (source, target, properties) {\n        for (var i = 0, l = properties.length; i < l; i++) {\n            var property = properties[i];\n            if(source.hasOwnProperty(property))\n                target[property] = source[property];\n        }\n    };\n})(Tribe.PubSub.utils);\n\n//@ sourceURL=http://Tribe.PubSub/utils.js");


window.eval("\nif (typeof(module) !== 'undefined')\n    module.exports = new Tribe.PubSub();\n//@ sourceURL=http://Tribe.PubSub/exports.js");


window.eval("\n(function (global) {\n    if (typeof (jQuery) === 'undefined')\n        throw 'jQuery must be loaded before knockout.composite can initialise';\n    if (typeof (ko) === 'undefined')\n        throw 'knockout.js must be loaded before knockout.composite can initialise';\n    if (typeof(T) === 'undefined')\n        throw 'Tribe.Common must be loaded before knockout.composite can initialise';\n\n    global.T = T || {};\n    global.T.Events = {};\n    global.T.Factories = {};\n    global.T.LoadHandlers = {};\n    global.T.LoadStrategies = {};\n    global.T.Transitions = {};\n    global.T.Types = {};\n    global.T.Utils = {};\n    global.T.logger = T.logger;\n    global.T.pubsub = new Tribe.PubSub();\n\n    $(function() {\n        $('head').append('<style class=\"__tribe\">.__rendering { position: fixed; top: -10000px; left: -10000px; }</style>');\n    });\n})(window || this);\n\n//@ sourceURL=http://Tribe.Composite/setup.js");


window.eval("\nT.defaultOptions = function() {\n    return {\n        synchronous: false,\n        handleExceptions: true,\n        basePath: '',\n        loadStrategy: 'adhoc',\n        events: ['loadResources', 'createPubSub', 'createModel', 'initialiseModel', 'renderPane', 'renderComplete', 'active', 'dispose']\n    };\n};\nT.options = T.defaultOptions();\n\n//@ sourceURL=http://Tribe.Composite/options.js");


window.eval("\n(function () {\n    ko.bindingHandlers.cssClass = {\n        update: function (element, valueAccessor) {\n            var value = valueAccessor();\n            if (value)\n                $(element).addClass(ko.utils.unwrapObservable(value));\n        }\n    };\n\n    ko.bindingHandlers.enterPressed = keyPressedBindingHandler(13);\n    ko.bindingHandlers.escapePressed = keyPressedBindingHandler(27);\n    \n    function keyPressedBindingHandler(which) {\n        return {\n            init: function (element, valueAccessor) {\n                var $element = $(element);\n                var callback = valueAccessor();\n                if ($.isFunction(callback))\n                    $element.keyup(testKey);\n\n                function testKey(event) {\n                    if (event.which === which) {\n                        //$element.blur();\n                        callback($element.val());\n                    }\n                }\n            }\n        };\n    }\n\n})();\n//@ sourceURL=http://Tribe.Composite/Utilities/bindingHandlers.js");


window.eval("\n(function (utils) {    \n    utils.each = function (collection, iterator) {\n        return $.each(collection || [], function (index, value) {\n            return iterator(value, index);\n        });\n    };\n\n    // jQuery map flattens returned arrays - we don't want this for grids\n    utils.map = function (collection, iterator) {\n        var result = [];\n        utils.each(collection || [], function(value, index) {\n            result.push(iterator(value, index));\n        });\n        return result;\n    };\n\n    utils.filter = function(array, iterator) {\n        var result = [];\n        $.each(array || [], function(index, value) {\n            if (iterator(value, index))\n                result.push(value);\n        });\n        return result;\n    };\n\n    utils.pluck = function(array, property) {\n        return utils.map(array, function(value) {\n            return value && value[property];\n        });\n    };\n\n    utils.reduce = function (array, initialValue, reduceFunction) {\n        utils.each(array, function(value, index) {\n            initialValue = reduceFunction(initialValue, value, index, array);\n        });\n        return initialValue;\n    };\n})(T.Utils);\n\n//@ sourceURL=http://Tribe.Composite/Utilities/collections.js");


window.eval("\n// this is taken from https://github.com/cowboy/jquery-bbq/, Copyright (c) 2010 \"Cowboy\" Ben Alman and also released under the MIT license\n\n// Deserialize a params string into an object, optionally coercing numbers,\n// booleans, null and undefined values; this method is the counterpart to the\n// internal jQuery.param method.\nT.Utils.deparam = function (params, coerce) {\n    var decode = decodeURIComponent;\n    var obj = {},\n      coerce_types = { 'true': !0, 'false': !1, 'null': null };\n\n    // Iterate over all name=value pairs.\n    $.each(params.replace(/\\+/g, ' ').split('&'), function (j, v) {\n        var param = v.split('='),\n          key = decode(param[0]),\n          val,\n          cur = obj,\n          i = 0,\n\n          // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it\n          // into its component parts.\n          keys = key.split(']['),\n          keys_last = keys.length - 1;\n\n        // If the first keys part contains [ and the last ends with ], then []\n        // are correctly balanced.\n        if (/\\[/.test(keys[0]) && /\\]$/.test(keys[keys_last])) {\n            // Remove the trailing ] from the last keys part.\n            keys[keys_last] = keys[keys_last].replace(/\\]$/, '');\n\n            // Split first keys part into two parts on the [ and add them back onto\n            // the beginning of the keys array.\n            keys = keys.shift().split('[').concat(keys);\n\n            keys_last = keys.length - 1;\n        } else {\n            // Basic 'foo' style key.\n            keys_last = 0;\n        }\n\n        // Are we dealing with a name=value pair, or just a name?\n        if (param.length === 2) {\n            val = decode(param[1]);\n\n            // Coerce values.\n            if (coerce) {\n                val = val && !isNaN(val) ? +val              // number\n                  : val === 'undefined' ? undefined         // undefined\n                  : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null\n                  : val;                                                // string\n            }\n\n            if (keys_last) {\n                // Complex key, build deep object structure based on a few rules:\n                // * The 'cur' pointer starts at the object top-level.\n                // * [] = array push (n is set to array length), [n] = array if n is \n                //   numeric, otherwise object.\n                // * If at the last keys part, set the value.\n                // * For each keys part, if the current level is undefined create an\n                //   object or array based on the type of the next keys part.\n                // * Move the 'cur' pointer to the next level.\n                // * Rinse & repeat.\n                for (; i <= keys_last; i++) {\n                    key = keys[i] === '' ? cur.length : keys[i];\n                    cur = cur[key] = i < keys_last\n                      ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : [])\n                      : val;\n                }\n\n            } else {\n                // Simple key, even simpler rules, since only scalars and shallow\n                // arrays are allowed.\n\n                if ($.isArray(obj[key])) {\n                    // val is already an array, so push on the next value.\n                    obj[key].push(val);\n\n                } else if (obj[key] !== undefined) {\n                    // val isn't an array, but since a second value has been specified,\n                    // convert val into an array.\n                    obj[key] = [obj[key], val];\n\n                } else {\n                    // val is a scalar.\n                    obj[key] = val;\n                }\n            }\n\n        } else if (key) {\n            // No value was defined, so set something meaningful.\n            obj[key] = coerce\n              ? undefined\n              : '';\n        }\n    });\n\n    return obj;\n};\n//@ sourceURL=http://Tribe.Composite/Utilities/deparam.js");


window.eval("\n(function() {\n    T.Utils.embedState = function (model, context, node) {\n        embedProperty(model, 'context', context);\n        embedProperty(model, 'node', node);\n    };\n\n    T.Utils.contextFor = function (element) {\n        return element && T.Utils.extractContext(ko.contextFor($(element)[0]));\n    };\n\n    T.Utils.extractContext = function (koBindingContext) {\n        return koBindingContext && embeddedProperty(koBindingContext.$root, 'context');\n    };\n\n    T.Utils.extractNode = function (koBindingContext) {\n        return koBindingContext && embeddedProperty(koBindingContext.$root, 'node');\n    };\n\n    function embedProperty(target, key, value) {\n        if (!target)\n            throw \"Can't embed property in falsy value\";\n        target['__' + key] = value;\n    }\n\n    function embeddedProperty(target, key) {\n        return target && target['__' + key];\n    }\n})();\n\n//@ sourceURL=http://Tribe.Composite/Utilities/embeddedContext.js");


window.eval("\n(function () {\n    T.Utils.elementDestroyed = function (element) {\n        if (element.constructor === jQuery)\n            element = element[0];\n\n        var promise = $.Deferred();\n\n        // Resolve when an element is removed using jQuery. This is a fallback for browsers not supporting DOMNodeRemoved and also executes synchronously.\n        $(element).on('destroyed', resolve);\n\n        // Resolve using the DOMNodeRemoved event. Not all browsers support this.\n        $(document).on(\"DOMNodeRemoved\", matchElement);\n\n        function matchElement(event) {\n            if (event.target === element)\n                resolve();\n        }\n\n        function resolve() {\n            $(element).off('destroyed', resolve);\n            $(document).off('DOMNodeRemoved', matchElement);\n            promise.resolve();\n        }\n\n        return promise;\n    };\n\n    // this used to use DOM functions to raise events, but IE8 doesn't support custom events\n    // we'll use jQuery, but expose the originalEvent for DOM events and the jQuery event\n    // for custom events (originalEvent is null for custom events).\n    T.Utils.raiseDocumentEvent = function (name, eventData) {\n        var e = $.Event(name);\n        e.eventData = eventData;\n        $(document).trigger(e);\n    };\n\n    var handlers = {};\n\n    // if a handler is used for more than one event, a leak will occur\n    T.Utils.handleDocumentEvent = function (name, handler) {\n        $(document).on(name, internalHandler);\n        handlers[handler] = internalHandler;\n        \n        function internalHandler(e) {\n            handler(e.originalEvent || e);\n        }\n    };\n\n    T.Utils.detachDocumentEvent = function (name, handler) {\n        $(document).off(name, handlers[handler]);\n        delete handlers[handler];\n    };\n})();\n//@ sourceURL=http://Tribe.Composite/Utilities/events.js");


window.eval("\nT.Utils.tryCatch = function(func, args, handleExceptions, message) {\n    if (handleExceptions)\n        try {\n            func.apply(this, args || []);\n        } catch (ex) {\n            T.logger.error(message, ex);\n        }\n    else\n        func.apply(this, args || []);\n};\n//@ sourceURL=http://Tribe.Composite/Utilities/exceptions.js");


window.eval("\n(function () {\n    T.Utils.idGenerator = function () {\n        return {\n            next: (function () {\n                var id = 0;\n                return function () {\n                    if (arguments[0] == 0) {\n                        id = 1;\n                        return 0;\n                    } else\n                        return id++;\n                };\n            })()\n        };\n    };\n\n    var generator = T.Utils.idGenerator();\n    T.Utils.getUniqueId = function () {\n        return generator.next();\n    };\n})();\n//@ sourceURL=http://Tribe.Composite/Utilities/idGenerator.js");


window.eval("\nif (!Array.prototype.indexOf) {\n    Array.prototype.indexOf = function (searchElement /*, fromIndex */) {\n        'use strict';\n        if (this == null) {\n            throw new TypeError();\n        }\n        var n, k, t = Object(this),\n            len = t.length >>> 0;\n\n        if (len === 0) {\n            return -1;\n        }\n        n = 0;\n        if (arguments.length > 1) {\n            n = Number(arguments[1]);\n            if (n != n) { // shortcut for verifying if it's NaN\n                n = 0;\n            } else if (n != 0 && n != Infinity && n != -Infinity) {\n                n = (n > 0 || -1) * Math.floor(Math.abs(n));\n            }\n        }\n        if (n >= len) {\n            return -1;\n        }\n        for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0) ; k < len; k++) {\n            if (k in t && t[k] === searchElement) {\n                return k;\n            }\n        }\n        return -1;\n    };\n}\n//@ sourceURL=http://Tribe.Composite/Utilities/indexOf.js");


window.eval("\n(function ($) {\n    $.complete = function (deferreds) {\n        var wrappers = [];\n        var deferred = $.Deferred();\n        var resolve = false;\n\n        if ($.isArray(deferreds))\n            $.each(deferreds, wrapDeferred);\n        else\n            wrapDeferred(0, deferreds);\n\n        $.when.apply($, wrappers).done(function() {\n            resolve ?\n                deferred.resolve() :\n                deferred.reject();\n        });\n\n        return deferred;\n\n        function wrapDeferred(index, original) {\n            wrappers.push($.Deferred(function (thisDeferred) {\n                $.when(original)\n                    .done(function() {\n                        resolve = true;\n                    })\n                    .always(function () {\n                        thisDeferred.resolve();\n                    });\n            }));\n        }\n    };\n})(jQuery);\n//@ sourceURL=http://Tribe.Composite/Utilities/jquery.complete.js");


window.eval("\n(function ($) {\n    var oldClean = jQuery.cleanData;\n\n    // knockout also calls cleanData from it's cleanNode method - avoid any loops\n    //var cleaning = {};\n\n    $.cleanData = function (elements) {\n        for (var i = 0, element; (element = elements[i]) !== undefined; i++) {\n            //if (!cleaning[element]) {\n                //cleaning[element] = true;\n                $(element).triggerHandler(\"destroyed\");\n                //delete cleaning[element];\n            //}\n        }\n        oldClean(elements);\n    };\n})(jQuery);\n//@ sourceURL=http://Tribe.Composite/Utilities/jquery.destroyed.js");


window.eval("\nT.Utils.cleanElement = function (element) {\n    // prevent knockout from calling cleanData \n    // - calls to this function ultimately result from cleanData being called by jQuery, so a loop will occur\n    var func = $.cleanData;\n    $.cleanData = undefined;\n    ko.cleanNode(element);\n    $.cleanData = func;\n};\n//@ sourceURL=http://Tribe.Composite/Utilities/knockout.js");


window.eval("\nT.Utils.arguments = function (args) {\n    var byConstructor = {};\n    $.each(args, function (index, arg) {\n        byConstructor[arg.constructor] = arg;\n    });\n\n    return {\n        byConstructor: function (constructor) {\n            return byConstructor(constructor);\n        },\n        object: byConstructor[Object],\n        string: byConstructor[String],\n        func: byConstructor[Function],\n        array: byConstructor[Array],\n        number: byConstructor[Number]\n    };\n};\n\nT.Utils.removeItem = function (array, item) {\n    var index = $.inArray(item, array);\n    if (index > -1)\n        array.splice(index, 1);\n};\n\nT.Utils.inheritOptions = function (from, to, options) {\n    for (var i = 0, l = options.length; i < l; i++)\n        to[options[i]] = from[options[i]];\n    return to;\n};\n\nT.Utils.cloneData = function (from, except) {\n    if (!from) return;\n    var result = {};\n    for (var property in from) {\n        var value = from[property];\n        if (from.hasOwnProperty(property) &&\n            (!except || Array.prototype.indexOf.call(arguments, property) === -1) &&\n            (!value || (value.constructor !== Function || ko.isObservable(value))))\n\n            result[property] = ko.utils.unwrapObservable(value);\n    }\n    return result;\n};\n\nT.Utils.normaliseBindings = function (valueAccessor, allBindingsAccessor) {\n    var data = allBindingsAccessor();\n    data.value = valueAccessor();\n    if (!ko.isObservable(data.value) && $.isFunction(data.value))\n        data.value = data.value();\n    return data;\n};\n\n\n//@ sourceURL=http://Tribe.Composite/Utilities/objects.js");


window.eval("\n(function () {\n    var utils = T.Utils;\n\n    utils.getPaneOptions = function(value, otherOptions) {\n        var options = value.constructor === String ? { path: value } : value;\n        return $.extend({}, otherOptions, options);\n    };\n\n    utils.bindPane = function (node, element, paneOptions, context) {\n        context = context || utils.contextFor(element) || T.context();\n        var pane = new T.Types.Pane($.extend({ element: $(element)[0] }, paneOptions));\n        node.setPane(pane);\n\n        context.renderOperation.add(pane);\n\n        var pipeline = new T.Types.Pipeline(T.Events, context);\n        pipeline.execute(context.options.events, pane);\n\n        return pane;\n    };\n\n    utils.insertPaneAfter = function (node, target, paneOptions, context) {\n        var element = $('<div/>').insertAfter(target);\n        return utils.bindPane(node, element, paneOptions, context);\n    };\n})();\n\n//@ sourceURL=http://Tribe.Composite/Utilities/panes.js");


window.eval("\n(function() {\n    T.Path = Path;\n\n    function Path(path) {\n        path = path ? normalise(path.toString()) : '';\n        var filenameIndex = path.lastIndexOf(\"/\") + 1;\n        var extensionIndex = path.lastIndexOf(\".\");\n\n        return {\n            withoutFilename: function() {\n                return Path(path.substring(0, filenameIndex));\n            },\n            filename: function() {\n                return Path(path.substring(filenameIndex));\n            },\n            extension: function() {\n                return extensionIndex === -1 ? '' : path.substring(extensionIndex + 1);\n            },\n            withoutExtension: function() {\n                return Path(extensionIndex === -1 ? path : path.substring(0, extensionIndex));\n            },\n            combine: function (additionalPath) {\n                return Path((path ? path + '/' : '') + additionalPath.toString());\n            },\n            isAbsolute: function() {\n                return path.charAt(0) === '/' ||\n                    path.indexOf('://') > -1;\n            },\n            makeAbsolute: function() {\n                return Path('/' + path);\n            },\n            makeRelative: function() {\n                return Path(path.charAt(0) === '/' ? path.substring(1) : path);\n            },\n            asMarkupIdentifier: function() {\n                return this.withoutExtension().toString().replace(/\\//g, '-').replace(/\\./g, '');\n            },\n            setExtension: function(extension) {\n                return Path(this.withoutExtension() + '.' + extension);\n            },\n            toString: function() {\n                return path.toString();\n            }\n        };\n\n        function normalise(input) {\n            input = removeDoubleSlashes(input);\n            input = removeParentPaths(input);\n            input = removeCurrentPaths(input);\n\n            return input;\n        }\n\n        function removeDoubleSlashes(input) {\n            var prefixEnd = input.indexOf('://') > -1 ? input.indexOf('://') + 3 : 0;\n            var prefix = input.substring(0, prefixEnd);\n            var inputPath = input.substring(prefixEnd);\n            return prefix + inputPath.replace(/\\/{2,}/g, '/');\n        }\n\n        function removeParentPaths(input) {\n            var regex = /[^\\/\\.]+\\/\\.\\.\\//;\n\n            while (input.match(regex))\n                input = input.replace(regex, '');\n\n            return input;\n        }\n\n        function removeCurrentPaths(input) {\n            var regex = /\\.\\//g;\n            // Ignore leading parent paths - the rest will have been stripped\n            // I can't figure out a regex that won't strip the ./ out of ../\n            var startIndex = input.lastIndexOf('../');\n            startIndex = startIndex == -1 ? 0 : startIndex + 3;\n            return input.substring(0, startIndex) + input.substring(startIndex).replace(regex, '');\n        }\n    };\n})();\n\n//@ sourceURL=http://Tribe.Composite/Utilities/Path.js");


window.eval("\n(function () {\n    // This is a modified version of modules from the YUI Library - \n    // http://yuilibrary.com/yui/docs/api/files/querystring_js_querystring-parse.js.html\n    // Either it should be rewritten or attribution and licensing be available here and on the website like in http://yuilibrary.com/license/\n\n    T.Utils.Querystring = T.Utils.Querystring || {};\n\n    T.Utils.Querystring.parse = function (source, seperator, eqSymbol) {\n        stripLeadIn();\n        \n        return T.Utils.reduce(\n            T.Utils.map(\n                source.split(seperator || \"&\"),\n                pieceParser(eqSymbol || \"=\")\n            ),\n            {},\n            mergeParams\n        );\n\n        function stripLeadIn() {\n            if(source.length > 0 && source.charAt(0) === '?')\n                source = source.substring(1);\n        }\n    };\n    \n    function unescape(s) {\n        return decodeURIComponent(s.replace(/\\+/g, ' '));\n    };\n\n    function pieceParser(eq) {\n        return function parsePiece(key, val) {\n\n            var sliced, numVal, head, tail, ret;\n\n            if (arguments.length === 2) {\n                // key=val, called from the map/reduce\n                key = key.split(eq);\n                return parsePiece(\n                    unescape(key.shift()),\n                    unescape(key.join(eq)),\n                    true\n                );\n            }\n            \n            key = key.replace(/^\\s+|\\s+$/g, '');\n            if (val.constructor === String) {\n                val = val.replace(/^\\s+|\\s+$/g, '');\n                // convert numerals to numbers\n                if (!isNaN(val)) {\n                    numVal = +val;\n                    if (val === numVal.toString(10)) {\n                        val = numVal;\n                    }\n                }\n            }\n            \n            sliced = /(.*)\\[([^\\]]*)\\]$/.exec(key);\n            if (!sliced) {\n                ret = {};\n                if (key)\n                    ret[key] = val;\n                return ret;\n            }\n            \n            // [\"foo[][bar][][baz]\", \"foo[][bar][]\", \"baz\"]\n            tail = sliced[2];\n            head = sliced[1];\n\n            // array: key[]=val\n            if (!tail)\n                return parsePiece(head, [val], true);\n\n            // object: key[subkey]=val\n            ret = {};\n            ret[tail] = val;\n            return parsePiece(head, ret, true);\n        };\n    }\n\n    // the reducer function that merges each query piece together into one set of params\n    function mergeParams(params, addition) {\n        return (\n            // if it's uncontested, then just return the addition.\n            (!params) ? addition\n            // if the existing value is an array, then concat it.\n            : ($.isArray(params)) ? params.concat(addition)\n            // if the existing value is not an array, and either are not objects, arrayify it.\n            : (!$.isPlainObject(params) || !$.isPlainObject(addition)) ? [params].concat(addition)\n            // else merge them as objects, which is a little more complex\n            : mergeObjects(params, addition)\n        );\n    }\n\n    // Merge two *objects* together. If this is called, we've already ruled\n    // out the simple cases, and need to do the for-in business.\n    function mergeObjects(params, addition) {\n        for (var i in addition)\n            if (i && addition.hasOwnProperty(i))\n                params[i] = mergeParams(params[i], addition[i]);\n\n        return params;\n    }\n})();\n\n//@ sourceURL=http://Tribe.Composite/Utilities/querystring.parse.js");


window.eval("\n(function () {\n    // This is a modified version of modules from the YUI Library - \n    // http://yuilibrary.com/yui/docs/api/files/querystring_js_querystring-stringify.js.html\n    // Either it should be rewritten or attribution and licensing be available here and on the website like in http://yuilibrary.com/license/\n\n    T.Utils.Querystring = T.Utils.Querystring || {};\n\n    var escape = encodeURIComponent;\n\n    T.Utils.Querystring.stringify = function (source, options) {\n        return stringify(source, options);\n    };\n\n    function stringify(source, options, name, stack) {\n        options = options || {};\n        stack = stack || [];\n        var begin, end, i, l, n, s;\n        var sep = options.seperator || \"&\";\n        var eq = options.eqSymbol || \"=\";\n        var arrayKey = options.arrayKey !== false;\n\n        if (source === null || source === undefined || source.constructor === Function)\n            return name ? escape(name) + eq : '';\n\n        if (source.constructor === Boolean || Object.prototype.toString.call(source) === '[object Boolean]')\n            source = +source;\n\n        if (!isNaN(source) || source.constructor === String)\n            return escape(name) + eq + escape(source);\n\n        if ($.isArray(source)) {\n            s = [];\n            name = arrayKey ? name + '[]' : name;\n            for (i = 0, l = source.length; i < l; i++) {\n                s.push(stringify(source[i], options, name, stack));\n            }\n\n            return s.join(sep);\n        }\n        \n        // now we know it's an object.\n        // Check for cyclical references in nested objects\n        for (i = stack.length - 1; i >= 0; --i)\n            if (stack[i] === source)\n                throw new Error(\"T.Utils.Querystring.stringify: cyclical reference\");\n\n        stack.push(source);\n        s = [];\n        begin = name ? name + '[' : '';\n        end = name ? ']' : '';\n        for (i in source) {\n            if (source.hasOwnProperty(i)) {\n                n = begin + i + end;\n                s.push(stringify(source[i], options, n, stack));\n            }\n        }\n\n        stack.pop();\n        s = s.join(sep);\n        if (!s && name)\n            return name + \"=\";\n\n        return s;\n    };\n})();\n\n//@ sourceURL=http://Tribe.Composite/Utilities/querystring.stringify.js");


window.eval("\n(function () {\n    T.Types.Flow = function (navigationSource, definition) {\n        var self = this;\n\n        this.node = navigationNode();\n        this.pubsub = this.node.pane.pubsub.owner;\n        this.sagas = [];\n\n        definition = createDefinition(self, definition);\n        this.saga = new Tribe.PubSub.Saga(this.pubsub, definition);\n\n        this.start = function(data) {\n            self.saga.start(data);\n            return self;\n        };\n\n        this.end = function(data) {\n            self.saga.end(data);\n            T.Utils.each(self.sagas, function(saga) {\n                saga.end(data);\n            });\n            return self;\n        };\n\n        function navigationNode() {\n            if (navigationSource.constructor === T.Types.Node)\n                return navigationSource.findNavigation().node;\n            if (navigationSource.constructor === T.Types.Pane)\n                return navigationSource.node.findNavigation().node;\n            throw new Error(\"navigationSource must be either T.Types.Pane or T.Types.Node\");\n        }\n    };\n\n    T.Types.Flow.prototype.startChild = function(definition, data) {\n        definition = createDefinition(this, definition);\n        this.saga.startChild(definition, data);\n        return this;\n    };\n\n    T.Types.Flow.prototype.navigate = function (pathOrOptions, data) {\n        this.node.navigate(pathOrOptions, data);\n    };\n    \n    // This keeps a separate collection of sagas bound to this flow's lifetime\n    // It would be nice to make them children of the underlying saga, but\n    // then they would end any time a message was executed.\n    T.Types.Flow.prototype.startSaga = function (definition, data) {\n        var saga = this.pubsub.startSaga(definition, data);\n        this.sagas.push(saga);\n        return saga;\n    };\n\n    // flow helpers\n    T.Types.Flow.prototype.to = function (pathOrOptions, data) {\n        var node = this.node;\n        return function () {\n            node.navigate(pathOrOptions, data);\n        };\n    };\n\n    T.Types.Flow.prototype.endsAt = function (pathOrOptions, data) {\n        var flow = this;\n        return function () {\n            flow.node.navigate(pathOrOptions, data);\n            flow.end();\n        };\n    };\n\n    T.Types.Flow.prototype.start = function(flow, data) {\n        var thisFlow = this;\n        return function() {\n            thisFlow.startChild(flow, data);\n        };\n    };\n\n\n    // This is reused by Node and Pane\n    T.Types.Flow.startFlow = function (definition, data) {\n        return new T.Types.Flow(this, definition).start(data);\n    };\n    \n    function createDefinition(flow, definition) {\n        if (definition.constructor === Function)\n            definition = new definition(flow);\n        return definition;\n    }\n})();\n//@ sourceURL=http://Tribe.Composite/Types/Flow.js");


window.eval("\nT.Types.History = function (history) {\n    var currentState = 0;\n    history.replaceState(currentState, window.title);\n\n    var popActions = {\n        raiseEvent: function (e) {\n            T.Utils.raiseDocumentEvent('browser.go', { count: (e.state - currentState) });\n            currentState = e.state;\n        },\n        updateStack: function(e) {\n            currentState = e.state;\n            currentAction = popActions.raiseEvent;\n        }\n    };\n    var currentAction = popActions.raiseEvent;\n\n    // this leaves IE7 & 8 high and dry. We'll probably require a polyfill and create a generic event subscription method\n    if(window.addEventListener)\n        window.addEventListener('popstate', executeCurrentAction);\n\n    function executeCurrentAction(e) {\n        if (e.state !== null) currentAction(e);\n    }\n\n    this.navigate = function (urlOptions) {\n        urlOptions = urlOptions || {};\n        history.pushState(++currentState, urlOptions.title, urlOptions.url);\n    };\n\n    this.go = function(frameCount) {\n        history.go(frameCount);\n    };\n\n    this.update = function(frameCount) {\n        currentAction = popActions.updateStack;\n        history.go(frameCount);\n    };\n\n    this.dispose = function () {\n        window.removeEventListener('popstate', executeCurrentAction);\n    };\n};\n\nif (window.history.pushState)\n    T.history = new T.Types.History(window.history);\nelse\n    T.history = new T.Types.History({\n        replaceState: function () { },\n        pushState: function () { },\n        go: function () { }\n    });\n//@ sourceURL=http://Tribe.Composite/Types/History.js");


window.eval("\nT.Types.Loader = function () {\n    var self = this;\n    var resources = {};\n\n    this.get = function(url, resourcePath, context) {\n        if (resources[url] !== undefined)\n            return resources[url];\n\n        var extension = T.Path(url).extension().toString();\n        var handler = T.LoadHandlers[extension];\n\n        if (handler) {\n            var result = handler(url, resourcePath, context);\n            resources[url] = result;\n            \n            $.when(result).always(function() {\n                resources[url] = null;\n            });\n            \n            return result;\n        }\n\n        T.logger.warn(\"Resource of type \" + extension + \" but no handler registered.\");\n        return null;\n    };\n};\n\n//@ sourceURL=http://Tribe.Composite/Types/Loader.js");


window.eval("\nT.Types.Navigation = function (node, options) {\n    normaliseOptions();\n    setInitialPaneState();\n\n    var stack = [initialStackItem()];\n    var currentFrame = 0;\n\n    this.node = node;\n    this.stack = stack;\n\n    this.navigate = function (paneOptions) {\n        if (options.browser)\n            T.history.navigate(options.browser && options.browser.urlDataFrom(paneOptions));\n\n        trimStack();\n        stack.push(paneOptions);\n        currentFrame++;\n\n        navigateTo(paneOptions);\n    };\n\n    this.isAtStart = function() {\n        return currentFrame === 0;\n    };\n\n    this.go = function(frameCount) {\n        go(frameCount);\n        if (options.browser) T.history.update(frameCount);\n    };\n    \n    if(options.browser) T.Utils.handleDocumentEvent('browser.go', onBrowserGo);\n    function onBrowserGo(e) {\n        go(e.eventData.count);\n    }\n\n    function go(frameCount) {\n        var newFrame = currentFrame + frameCount;\n        if (newFrame < 0) newFrame = 0;\n        if (newFrame >= stack.length) newFrame = stack.length - 1;\n\n        if (newFrame != currentFrame)\n            navigateTo(stack[newFrame], frameCount < 0);\n\n        currentFrame = newFrame;\n    }\n\n    function navigateTo(paneOptions, reverse) {\n        T.Utils.raiseDocumentEvent('navigating', { node: node, options: paneOptions, browserData: options.browserData });\n        node.transitionTo(paneOptions, options.transition, reverse);\n    }\n\n    function trimStack() {\n        stack.splice(currentFrame + 1, stack.length);\n    }\n\n    this.dispose = function() {\n        T.Utils.detachDocumentEvent('browser.go', onBrowserGo);\n    };\n    \n    function normaliseOptions() {\n        options = options || {};\n        if (options.constructor === String)\n            options = { transition: options };\n        if (options.browser === true)\n            options.browser = T.options.defaultUrlProvider;\n    }\n    \n    function setInitialPaneState() {\n        var query = window.location.href.match(/\\#.*/);\n        if (query) query = query[0].substring(1);\n        var urlState = options.browser && options.browser.paneOptionsFrom(query);\n        if (urlState) {\n            node.pane.path = urlState.path;\n            node.pane.data = urlState.data;\n        }\n    }\n    \n    function initialStackItem() {\n        return { path: node.pane.path, data: node.pane.data };\n    }\n};\n//@ sourceURL=http://Tribe.Composite/Types/Navigation.js");


window.eval("\nT.Types.Node = function (parent, pane) {\n    this.parent = parent;\n    this.children = [];\n    this.root = parent ? parent.root : this;\n    this.id = T.Utils.getUniqueId();\n\n    if (parent) parent.children.push(this);\n    if (pane) this.setPane(pane);\n};\n\nT.Types.Node.prototype.navigate = function (pathOrPane, data) {\n    var paneOptions = T.Utils.getPaneOptions(pathOrPane, { data: data });\n    if (!T.Path(paneOptions.path).isAbsolute())\n        // this is duplicated in Pane.inheritPathFrom - the concept (relative paths inherit existing paths) needs to be clearer\n        paneOptions.path = T.Path(this.nodeForPath().pane.path).withoutFilename().combine(paneOptions.path).toString();\n    \n    this.findNavigation().navigate(paneOptions);\n};\n\nT.Types.Node.prototype.navigateBack = function () {\n    this.findNavigation().go(-1);\n};\n\nT.Types.Node.prototype.findNavigation = function() {\n    if (this.defaultNavigation)\n        return this.defaultNavigation;\n\n    else if (this.navigation)\n        return this.navigation;\n        \n    if (!this.parent) {\n        this.navigation = new T.Types.Navigation(this);\n        return this.navigation;\n    }\n\n    return this.parent.findNavigation();\n};\n\nT.Types.Node.prototype.transitionTo = function(paneOptions, transition, reverse) {\n    T.transition(this, transition, reverse).to(paneOptions);\n};\n\nT.Types.Node.prototype.setPane = function (pane) {\n    if (this.pane)\n        this.pane.node = null;\n\n    pane.node = this;\n    this.pane = pane;\n    this.skipPath = pane.skipPath;\n\n    if (pane.handlesNavigation) {\n        this.navigation = new T.Types.Navigation(this, pane.handlesNavigation);\n        \n        // this sets this pane as the \"default\", accessible from panes outside the tree. First in best dressed.\n        this.root.defaultNavigation = this.root.defaultNavigation || this.navigation;\n    }\n\n    pane.inheritPathFrom(this.parent);\n};\n\nT.Types.Node.prototype.nodeForPath = function() {\n    return this.skipPath && this.parent ? this.parent.nodeForPath() : this;\n};\n\nT.Types.Node.prototype.dispose = function() {\n    if (this.root.defaultNavigation === this.navigation)\n        this.root.defaultNavigation = null;\n\n    if (this.parent)\n        T.Utils.removeItem(this.parent.children, this);\n\n    if (this.pane && this.pane.dispose) {\n        delete this.pane.node;\n        this.pane.dispose();\n    }\n};\n\nT.Types.Node.prototype.startFlow = T.Types.Flow.startFlow;\n\n//@ sourceURL=http://Tribe.Composite/Types/Node.js");


window.eval("\nT.Types.Operation = function () {\n    var self = this;\n    var incomplete = [];\n\n    this.promise = $.Deferred();\n\n    this.add = function(id) {\n        incomplete.push(id);\n    };\n\n    this.complete = function (id) {\n        T.Utils.removeItem(incomplete, id);\n        if (incomplete.length === 0)\n            self.promise.resolve();\n    };\n    \n};\n//@ sourceURL=http://Tribe.Composite/Types/Operation.js");


window.eval("\nT.Types.Pane = function (options) {\n    T.Utils.inheritOptions(options, this, ['path', 'data', 'element', 'transition', 'reverseTransitionIn', 'handlesNavigation', 'pubsub', 'id', 'skipPath']);\n\n    // events we are interested in hooking in to - this could be done completely generically by the pipeline\n    this.is = {\n        rendered: $.Deferred(),\n        disposed: $.Deferred()\n    };    \n};\n\nT.Types.Pane.prototype.navigate = function (pathOrPane, data) {\n    this.node && this.node.navigate(pathOrPane, data);\n};\n\nT.Types.Pane.prototype.navigateBack = function () {\n    this.node && this.node.navigateBack();\n};\n\nT.Types.Pane.prototype.remove = function () {\n    $(this.element).remove();\n};\n\nT.Types.Pane.prototype.dispose = function () {\n    if (this.model && this.model.dispose)\n        this.model.dispose();\n\n    if (this.node) {\n        delete this.node.pane;\n        this.node.dispose();\n    }\n\n    if (this.element)\n        T.Utils.cleanElement(this.element);\n};\n\nT.Types.Pane.prototype.inheritPathFrom = function (node) {\n    node = node && node.nodeForPath();\n    var pane = node && node.pane;    \n    var path = T.Path(this.path);\n    if (path.isAbsolute() || !pane)\n        this.path = path.makeAbsolute().toString();\n    else\n        this.path = T.Path(pane.path).withoutFilename().combine(path).toString();\n};\n\nT.Types.Pane.prototype.find = function(selector) {\n    return $(this.element).find(selector);\n};\n\nT.Types.Pane.prototype.startRender = function () {\n    $(this.element).addClass('__rendering');\n};\n\nT.Types.Pane.prototype.endRender = function () {\n    $(this.element).removeClass('__rendering');\n};\n\nT.Types.Pane.prototype.toString = function () {\n    return \"{ path: '\" + this.path + \"' }\";\n};\n\nT.Types.Pane.prototype.startSaga = function(path, args) {\n    var saga = T.context().sagas[path];\n    this.pubsub.startSaga.apply(this.pubsub, [saga.constructor].concat(Array.prototype.slice.call(arguments, 1)));\n};\n\nT.Types.Pane.prototype.startFlow = T.Types.Flow.startFlow;\n\n//@ sourceURL=http://Tribe.Composite/Types/Pane.js");


window.eval("\nT.Types.Pipeline = function (events, context) {\n    this.execute = function (eventsToExecute, target) {\n        var currentEvent = -1;\n        var promise = $.Deferred();\n        executeNextEvent();\n\n        function executeNextEvent() {\n            currentEvent++;\n            if (currentEvent >= eventsToExecute.length) {\n                promise.resolve();\n                return;\n            }\n\n            var eventName = eventsToExecute[currentEvent];\n            var thisEvent = events[eventName];\n\n            if (!thisEvent) {\n                T.logger.warn(\"No event defined for \" + eventName);\n                executeNextEvent();\n                return;\n            }\n\n            $.when(thisEvent(target, context))\n                .done(executeNextEvent)\n                .fail(handleFailure);\n\n            function handleFailure() {\n                promise.reject();\n                var targetDescription = target ? target.toString() : \"empty target\";\n                T.logger.error(\"An error occurred in the '\" + eventName + \"' event for \" + targetDescription);\n            }\n        }\n\n        return promise;\n    };\n};\n//@ sourceURL=http://Tribe.Composite/Types/Pipeline.js");


window.eval("\nT.Types.Resources = function () { };\n\nT.Types.Resources.prototype.register = function (resourcePath, constructor, options) {\n    this[resourcePath] = {\n        constructor: constructor,\n        options: options || {}\n    };\n    T.logger.debug(\"Model loaded for \" + resourcePath);\n};\n//@ sourceURL=http://Tribe.Composite/Types/Resources.js");


window.eval("\nT.Types.Templates = function () {\n    var self = this;\n\n    this.store = function (template, path) {\n        var id = T.Path(path).asMarkupIdentifier().toString();\n        embedTemplate(template, 'template-' + id);\n    };\n    \n    function embedTemplate(template, id) {\n        var element = document.createElement('script');\n        element.className = '__tribe';\n        element.setAttribute('type', 'text/template');\n        element.id = id;\n        element.text = template;\n        document.getElementsByTagName('head')[0].appendChild(element);\n    }\n    \n    this.loaded = function(path) {\n        return $('head script#template-' + T.Path(path).asMarkupIdentifier()).length > 0;\n    };\n\n    this.render = function (target, path) {\n        var id = T.Path(path).asMarkupIdentifier();\n        // can't use html() to append - this uses the element innerHTML property and IE7 and 8 will strip comments (i.e. containerless control flow bindings)\n        $(target).empty().append($('head script#template-' + id).html());\n    };\n};\n//@ sourceURL=http://Tribe.Composite/Types/Templates.js");


window.eval("\nT.Events.active = function (pane, context) {\n    return T.Utils.elementDestroyed(pane.element);\n};\n//@ sourceURL=http://Tribe.Composite/Events/active.js");


window.eval("\nT.Events.createModel = function (pane, context) {\n    var definition = context.models[pane.path];\n    var model = definition && definition.constructor ?\n        new definition.constructor(pane) :\n        { pane: pane, data: pane.data };\n\n    T.Utils.embedState(model, context, pane.node);\n\n    pane.model = model;\n};\n//@ sourceURL=http://Tribe.Composite/Events/createModel.js");


window.eval("\nT.Events.createPubSub = function (pane, context) {\n    if (context.pubsub)\n        pane.pubsub = context.pubsub.createLifetime ?\n            context.pubsub.createLifetime() :\n            context.pubsub;\n};\n\n//@ sourceURL=http://Tribe.Composite/Events/createPubSub.js");


window.eval("\nT.Events.dispose = function (pane, context) {\n    pane.pubsub && pane.pubsub.end && pane.pubsub.end();\n    pane.dispose();\n    pane.is.disposed.resolve();\n};\n\n//@ sourceURL=http://Tribe.Composite/Events/dispose.js");


window.eval("\nT.Events.initialiseModel = function (pane, context) {\n    if (pane.model.initialise)\n        return pane.model.initialise();\n    return null;\n};\n//@ sourceURL=http://Tribe.Composite/Events/initialiseModel.js");


window.eval("\nT.Events.loadResources = function (pane, context) {\n    var strategy = T.LoadStrategies[context.options.loadStrategy];\n    \n    if (!strategy)\n        throw \"Unknown resource load strategy\";\n\n    return strategy(pane, context);\n};\n//@ sourceURL=http://Tribe.Composite/Events/loadResources.js");


window.eval("\nT.Events.renderComplete = function (pane, context) {\n    $.when(\n        T.transition(pane, pane.transition, pane.reverseTransitionIn)['in']())\n     .done(executeRenderComplete);\n    \n    pane.endRender();\n\n    function executeRenderComplete() {\n        if (pane.model.renderComplete)\n            pane.model.renderComplete();\n        pane.is.rendered.resolve();\n        T.Utils.raiseDocumentEvent('renderComplete', pane);\n        context.renderOperation = new T.Types.Operation();\n    }\n};\n//@ sourceURL=http://Tribe.Composite/Events/renderComplete.js");


window.eval("\nT.Events.renderPane = function (pane, context) {\n    var renderOperation = context.renderOperation;\n\n    pane.startRender();\n    context.templates.render(pane.element, pane.path);\n    T.Utils.tryCatch(applyBindings, null, context.options.handleExceptions, 'An error occurred applying the bindings for ' + pane.toString());\n\n    if (pane.model.paneRendered)\n        pane.model.paneRendered();\n\n    renderOperation.complete(pane);\n    return renderOperation.promise;\n\n    function applyBindings() {\n        ko.applyBindingsToDescendants(pane.model, pane.element);\n    }\n};\n//@ sourceURL=http://Tribe.Composite/Events/renderPane.js");


window.eval("\nT.LoadHandlers.js = function (url, resourcePath, context) {\n    return $.ajax({\n        url: url,\n        dataType: 'text',\n        async: !context.options.synchronous,\n        cache: false,\n        success: executeScript\n    });\n\n    function executeScript(script) {\n        T.scriptEnvironment = {\n            url: url,\n            resourcePath: resourcePath,\n            context: context\n        };\n\n        T.Utils.tryCatch($.globalEval, [appendSourceUrl(script)], context.options.handleExceptions,\n            'An error occurred executing script loaded from ' + url + (resourcePath ? ' for resource ' + resourcePath : ''));\n\n        delete T.scriptEnvironment;\n\n        T.logger.debug('Loaded script from ' + url);\n    }\n\n    function appendSourceUrl(script) {\n        return script + '\\n//@ sourceURL=tribe://Application/' + url.replace(/ /g, \"_\");\n    }    \n};\n//@ sourceURL=http://Tribe.Composite/LoadHandlers/scripts.js");


window.eval("\nT.LoadHandlers.css = function (url, resourcePath, context) {\n    var supportsTextNodes = true;\n    \n    return $.ajax({\n        url: url,\n        dataType: 'text',\n        async: !context.options.synchronous,\n        cache: false,\n        success: renderStylesheet\n    });\n\n    function renderStylesheet(stylesheet) {\n        var element = document.getElementById('__tribeStyles');\n        if (!element) {\n            element = document.createElement('style');\n            element.className = '__tribe';\n            element.id = '__tribeStyles';\n            document.getElementsByTagName('head')[0].appendChild(element);\n        }\n\n        if(supportsTextNodes)\n            try {\n                element.appendChild(document.createTextNode(stylesheet));\n            } catch(ex) {\n                supportsTextNodes = false;\n            }\n\n        if (!supportsTextNodes)\n            if (element.styleSheet) {\n                // using styleSheet.cssText is required for IE8 support\n                // IE8 also has a limit on the number of <style/> elements, so append it to the same node\n                element.styleSheet.cssText += stylesheet;\n            } else throw new Error('Unable to append stylesheet for ' + resourcePath + ' to document.');\n    }\n};\n//@ sourceURL=http://Tribe.Composite/LoadHandlers/stylesheets.js");


window.eval("\nT.LoadHandlers.htm = function (url, resourcePath, context) {\n    return $.ajax({\n        url: url,\n        dataType: 'html',\n        async: !context.options.synchronous,\n        cache: false,\n        success: storeTemplate\n    });\n\n    function storeTemplate(template) {\n        context.templates.store(template, resourcePath);\n    }\n};\nT.LoadHandlers.html = T.LoadHandlers.htm;\n\n//@ sourceURL=http://Tribe.Composite/LoadHandlers/templates.js");


window.eval("\nT.LoadStrategies.adhoc = function (pane, context) {\n    if (context.loadedPanes[pane.path] !== undefined)\n        return context.loadedPanes[pane.path];\n\n    var path = T.Path(context.options.basePath).combine(T.Path(pane.path).makeRelative());\n\n    if (context.templates.loaded(pane.path) || context.models[pane.path])\n        return null;\n\n    var deferred = $.complete([\n        context.loader.get(path.setExtension('js').toString(), pane.path, context),\n        context.loader.get(path.setExtension('htm').toString(), pane.path, context),\n        context.loader.get(path.setExtension('css').toString(), pane.path, context)\n    ]);\n\n    context.loadedPanes[pane.path] = deferred;\n\n    $.when(deferred)\n        .fail(function() {\n            T.logger.error(\"Unable to load resources for '\" + pane.path + \"'.\");\n        })\n        .always(function () {\n            context.loadedPanes[pane.path] = null;\n        });\n\n    return deferred;\n};\n//@ sourceURL=http://Tribe.Composite/LoadStrategies/adhoc.js");


window.eval("\nT.LoadStrategies.preloaded = function (pane, context) {\n    if (!context.models[pane.path] && !context.templates.loaded(pane.path)) {\n        T.logger.error(\"No resources loaded for '\" + pane.path + \"'.\");\n        return $.Deferred().reject();\n    }\n    return null;\n};\n//@ sourceURL=http://Tribe.Composite/LoadStrategies/preloaded.js");


window.eval("\nT.transition = function (target, transition, reverse) {\n    var node;\n    var pane;\n    var element;\n    setState();\n    \n    transition = transition || (pane && pane.transition) || (node && node.transition);\n    var implementation = T.Transitions[transition];\n    if (reverse && implementation && implementation.reverse)\n        implementation = T.Transitions[implementation.reverse];\n\n    return {\n        'in': function () {\n            $(element).show();\n            return implementation && implementation['in'](element);\n        },\n        \n        out: function (remove) {\n            setTransitionMode();\n            \n            var promise = implementation && implementation.out(element);\n            $.when(promise).done(removeElement);\n            return promise;\n            \n            function removeElement() {\n                if (remove === false) {\n                    $(element).hide().attr('style', '');\n                } else\n                    $(element).remove();\n            }\n        },\n        \n        to: function (paneOptions, remove) {\n            var context = T.context();\n            if (node)\n                T.Utils.insertPaneAfter(node, element, T.Utils.getPaneOptions(paneOptions, { transition: transition, reverseTransitionIn: reverse }), context);\n            else\n                T.insertNodeAfter(element, T.Utils.getPaneOptions(paneOptions, { transition: transition, reverseTransitionIn: reverse }), null, context);\n            this.out(remove);\n            return context.renderOperation.promise;\n        }\n    };\n    \n    function setTransitionMode() {\n        var $element = $(element);\n        if (T.transition.mode === 'fixed')\n            $element.css({\n                position: 'fixed',\n                width: $element.width(),\n                left: $element.offset().left,\n                top: $element.offset().top\n            });\n        else\n            $element.css({\n                position: 'absolute',\n                width: $element.width(),\n                left: $element.position().left,\n                top: $element.position().top\n            });\n    }\n\n    function setState() {\n        if (!target) throw \"No target passed to T.transition\";\n        \n        if (target.constructor === T.Types.Node) {\n            node = target;\n            pane = node.pane;\n            element = pane.element;\n        } else if (target.constructor === T.Types.Pane) {\n            pane = target;\n            node = pane.node;\n            element = pane.element;\n        } else {\n            element = target;\n        }\n    }    \n};\n//@ sourceURL=http://Tribe.Composite/Transitions/transition.js");


window.eval("\n(function () {\n    var supported = supportsTransitions();\n    \n    createCssTransition('fade');\n    createCssTransition('slideLeft', 'slideRight');\n    createCssTransition('slideRight', 'slideLeft');\n    createCssTransition('slideUp', 'slideDown');\n    createCssTransition('slideDown', 'slideUp');\n\n    var transitionEndEvents = 'webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd';\n\n    function createCssTransition(transition, reverse) {\n        T.Transitions[transition] = {\n            'in': function (element) {\n                if (!supported) return null;\n                \n                var promise = $.Deferred();\n                $(element).bind(transitionEndEvents, transitionEnded(element, promise))\n                    .addClass('prepare in ' + transition);\n\n                trigger(element);\n                return promise;\n            },\n\n            out: function (element) {\n                if (!supported) return null;\n                var promise = $.Deferred();\n\n                $(element).addClass('prepare out ' + transition)\n                    .on(transitionEndEvents, transitionEnded(element, promise, true));\n\n                trigger(element);\n                return promise;\n            },\n            reverse: reverse || transition\n        };\n\n        function trigger(element) {\n            setTimeout(function () {\n                $(element).addClass('trigger');\n            }, 30);\n        }\n\n        function transitionEnded(element, promise, hide) {\n            return function() {\n                $(element).unbind(transitionEndEvents)\n                    .removeClass(transition + ' in out prepare trigger');\n                if (hide) $(element).hide();\n                promise.resolve();\n            };\n        }\n    }\n    \n    function supportsTransitions() {\n        var b = document.body || document.documentElement;\n        var style = b.style;\n        var property = 'transition';\n        var vendors = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];\n\n        if (typeof style[property] == 'string') { return true; }\n\n        // Tests for vendor specific prop\n        property = property.charAt(0).toUpperCase() + property.substr(1);\n        for (var i = 0, l = vendors.length; i < l; i++) {\n            if (typeof style[vendors[i] + property] == 'string') { return true; }\n        }\n        \n        return false;\n    }\n})();\n\n//@ sourceURL=http://Tribe.Composite/Transitions/Css/css.js");


window.eval("\n\n//\nwindow.__appendStyle = function (content) {\n    var element = document.getElementById('__tribeStyles');\n    if (!element) {\n        element = document.createElement('style');\n        element.className = '__tribe';\n        element.id = '__tribeStyles';\n        document.getElementsByTagName('head')[0].appendChild(element);\n    }\n\n    if(element.styleSheet)\n        element.styleSheet.cssText += content;\n    else\n        element.appendChild(document.createTextNode(content));\n};//\nwindow.__appendStyle('.trigger{-webkit-transition:all 250ms ease-in-out;transition:all 250ms ease-in-out}.fade.in.prepare{opacity:0}.fade.in.trigger{opacity:1}.fade.out.prepare{opacity:1}.fade.out.trigger{opacity:0}.slideRight.in.prepare{-webkit-transform:translateX(-100%);transform:translateX(-100%)}.slideRight.in.trigger{-webkit-transform:translateX(0);transform:translateX(0)}.slideRight.out.trigger{-webkit-transform:translateX(100%);transform:translateX(100%)}.slideLeft.in.prepare{-webkit-transform:translateX(100%);transform:translateX(100%)}.slideLeft.in.trigger{-webkit-transform:translateX(0);transform:translateX(0)}.slideLeft.out.trigger{-webkit-transform:translateX(-100%);transform:translateX(-100%)}.slideDown.in.prepare{-webkit-transform:translateY(-100%);transform:translateY(-100%)}.slideDown.in.trigger{-webkit-transform:translateY(0);transform:translateY(0)}.slideDown.out.trigger{-webkit-transform:translateY(100%);transform:translateY(100%)}.slideUp.in.prepare{-webkit-transform:translateY(100%);transform:translateY(100%)}.slideUp.in.trigger{-webkit-transform:translateY(0);transform:translateY(0)}.slideUp.out.trigger{-webkit-transform:translateY(-100%);transform:translateY(-100%)}');\n//@ sourceURL=http://Tribe.Composite/Transitions/Css/style.css.js");


window.eval("\n(function () {\n    T.registerModel = function () {\n        addResource('models', T.Utils.arguments(arguments));\n    };\n\n    T.registerSaga = function () {\n        addResource('sagas', T.Utils.arguments(arguments));\n    };\n    \n    function addResource(contextProperty, args) {\n        var environment = T.scriptEnvironment || {};\n        var context = environment.context || T.context();\n\n        var path = args.string || environment.resourcePath;\n        var constructor = args.func;\n        var options = args.object;\n\n        context[contextProperty].register(path, constructor, options);\n    }\n\n    T.run = function(options) {\n        T.options = $.extend(T.options, options);\n        T.options.pubsub = T.options.pubsub || new Tribe.PubSub({ sync: T.options.synchronous, handleExceptions: T.options.handleExceptions });\n        ko.applyBindings();\n        //if (preload) {\n        //    var promises = [];\n        //    var context = T.context();\n\n        //    if ($.isArray(preload))\n        //        for (var i = 0, l = preload.length; i < l; i++)\n        //            addPromise(preload[i]);\n        //    else if(preload.constructor === String)\n        //        addPromise(preload);\n            \n        //    function addPromise(path) {\n        //        promises.push(context.loader.get(T.Path(context.options.basePath).combine(path).toString(), null, context));\n        //    }\n\n        //    return $.when.apply(null, promises).done(function () {\n        //        ko.applyBindings(model);\n        //    });\n        //} else\n        //    ko.applyBindings(model);\n    };\n})(); \n//@ sourceURL=http://Tribe.Composite/Api/api.js");


window.eval("\n(function () {\n    var staticState;\n\n    T.context = function (source) {\n        staticState = staticState || {\n            models: new T.Types.Resources(),\n            sagas: new T.Types.Resources(),\n            loader: new T.Types.Loader(),\n            options: T.options,\n            templates: new T.Types.Templates(),\n            loadedPanes: {}\n        };\n        var perContextState = {\n            renderOperation: new T.Types.Operation(),\n            pubsub: T.options.pubsub\n        };\n        return $.extend({}, staticState, perContextState, source);\n    };\n})();\n\n//@ sourceURL=http://Tribe.Composite/Api/context.js");


window.eval("\nT.options.defaultUrlProvider = {\n    urlDataFrom: function(paneOptions) {\n        return paneOptions && { url: '#' + $.param(paneOptions) };\n    },\n    paneOptionsFrom: function(url) {\n        return url && T.Utils.deparam(url.substr(1));\n    }\n};\n//@ sourceURL=http://Tribe.Composite/Api/defaultUrlProvider.js");


window.eval("\n(function () {\n    var utils = T.Utils;\n\n    T.createNode = function (element, paneOptions, parentNode, context) {\n        parentNode = parentNode || T.nodeFor(element);\n        context = context || utils.contextFor(element) || T.context();\n\n        var node = new T.Types.Node(parentNode);\n        utils.bindPane(node, element, paneOptions, context);\n\n        return node;\n    };\n\n    T.appendNode = function (target, paneOptions, parentNode, context) {\n        var element = $('<div/>').appendTo(target);\n        return T.createNode(element, paneOptions, parentNode, context);\n    };\n\n    T.insertNodeAfter = function (target, paneOptions, parentNode, context) {\n        var element = $('<div/>').insertAfter(target);\n        return T.createNode(element, paneOptions, parentNode || T.nodeFor(target), context);\n    };\n\n    T.nodeFor = function (element) {\n        return element && T.Utils.extractNode(ko.contextFor($(element)[0]));\n    };\n})();\n\n//@ sourceURL=http://Tribe.Composite/Api/nodes.js");


window.eval("\n(function() {\n    ko.bindingHandlers.foreachProperty = {\n        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {\n            return ko.bindingHandlers.foreach.init(element, makeAccessor(mapToArray(valueAccessor())), allBindingsAccessor, viewModel, bindingContext);\n        },\n        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {\n            return ko.bindingHandlers.foreach.update(element, makeAccessor(mapToArray(valueAccessor())), allBindingsAccessor, viewModel, bindingContext);\n        }\n    };\n    \n    function makeAccessor(source) {\n        return function() {\n            return source;\n        };\n    }\n\n    function mapToArray(source) {\n        var result = [];\n        for (var property in source)\n            if (source.hasOwnProperty(property))\n                // we don't want to modify the original object, extend it onto a new object\n                result.push($.extend({ $key: property }, source[property]));\n        return result;\n    }\n})();\n\n//@ sourceURL=http://Tribe.Composite/BindingHandlers/foreachProperty.js");


window.eval("\nko.bindingHandlers.navigate = {\n    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {\n        var node = T.nodeFor(element);\n        if (!node) return;\n\n        var data = T.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);\n        var handler = ko.bindingHandlers.validatedClick || ko.bindingHandlers.click;\n        handler.init(element, navigate, allBindingsAccessor, viewModel);\n\n        function navigate() {\n            return function () {\n                node.navigate(data.value, T.Utils.cloneData(data.data));\n            };\n        }\n    }\n};\n//@ sourceURL=http://Tribe.Composite/BindingHandlers/navigate.js");


window.eval("\nko.bindingHandlers.navigateBack = {\n    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {\n        var node = T.nodeFor(element);\n        if (!node) return;\n\n        ko.bindingHandlers.click.init(element, navigateBack, allBindingsAccessor, viewModel);\n\n        function navigateBack() {\n            return function () {\n                node.navigateBack();\n            };\n        }\n    }\n};\n//@ sourceURL=http://Tribe.Composite/BindingHandlers/navigateBack.js");


window.eval("\n(function() {\n    ko.bindingHandlers.pane = { init: updateBinding };\n\n    function updateBinding(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {\n        T.createNode(element, constructPaneOptions(), T.Utils.extractNode(bindingContext), T.Utils.extractContext(bindingContext));\n\n        return { controlsDescendantBindings: true };\n\n        function constructPaneOptions() {\n            return T.Utils.getPaneOptions(ko.utils.unwrapObservable(valueAccessor()), allBindingsAccessor());\n        }\n    }\n})();\n\n//@ sourceURL=http://Tribe.Composite/BindingHandlers/pane.js");


window.eval("\nko.bindingHandlers.publish = {\n    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {\n        var pubsub = T.nodeFor(element).pane.pubsub;\n        if (!pubsub) return;\n\n        var data = T.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);\n        var handler = ko.bindingHandlers.validatedClick || ko.bindingHandlers.click;\n        handler.init(element, publishAccessor, allBindingsAccessor, viewModel);\n\n        function publishAccessor() {\n            return function () {\n                pubsub.publish(data.value, T.Utils.cloneData(data.data));\n            };\n        }\n    }\n};\n//@ sourceURL=http://Tribe.Composite/BindingHandlers/publish.js");

},{}],"tribe/register":[function(require,module,exports){
module.exports=require('2OrlGQ');
},{}],"2OrlGQ":[function(require,module,exports){
module.exports = {
    saga: T.registerSaga,
    handler: function () {
        throw new Error("You can't register a static handler on the client (yet)!");
    },
    service: function () {
        throw new Error("You can't register a service on the client!");
    }
};
},{}],12:[function(require,module,exports){
//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.5.2';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array, using the modern version of the 
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from an array.
  // If **n** is not specified, returns a single random element from the array.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (arguments.length < 2 || guard) {
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, value, context) {
      var result = {};
      var iterator = value == null ? _.identity : lookupIterator(value);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n == null) || guard ? array[0] : slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) {
      return array[array.length - 1];
    } else {
      return slice.call(array, Math.max(array.length - n, 0));
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, "length").concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error("bindAll must be passed function names");
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

},{}]},{},[9,8,1,2,3,4,5,6])