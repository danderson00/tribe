
// Source/logger.js

(function () {
    var level = 4;
    var levels = {
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        none: 0
    };

    var api = {
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
                console.error(('ERROR: ' + message), error);
        }
    };
    api.log = api.debug;
    
    if (typeof (exports) !== 'undefined' && typeof (module) !== 'undefined')
        module.exports = api;
    else {
        if (typeof (T) === 'undefined')
            T = {};
        T.logger = api;
    }
})();




// Source/serializer.js

(function () {
    // man... this cross-platform stuff sucks...
    var ko;
    if (typeof (window) !== 'undefined')
        ko = window.ko;
    if (typeof (require) !== 'undefined')
        ko = require('knockout');

    var api = {
        serialize: function (source) {
            return JSON.stringify(this.extractMetadata(source));
        },
        extractMetadata: function (source) {
            var target = source,
                metadata = {};
            removeObservables();
            return {
                target: target,
                metadata: metadata
            };

            function removeObservables() {
                metadata.observables = [];
                for (var property in target)
                    if (target.hasOwnProperty(property) && ko.isObservable(target[property])) {
                        target[property] = target[property]();
                        metadata.observables.push(property);
                    }

            }
        },
        deserialize: function (source) {
            source = JSON.parse(source);
            if (source.target)
                return this.applyMetadata(source.target, source.metadata);
            return source;
        },
        applyMetadata: function (target, metadata) {
            if (metadata)
                restoreObservables();
            return target;

            function restoreObservables() {
                var observables = metadata.observables;
                for (var i = 0, l = observables.length; i < l; i++)
                    restoreProperty(observables[i]);
            }

            function restoreProperty(property) {
                target[property] = createObservable(target[property]);
            }

            function createObservable(value) {
                return value.constructor === Array ?
                    ko.observableArray(value) :
                    ko.observable(value);
            }
        }
    };

    if (typeof (exports) !== 'undefined' && typeof (module) !== 'undefined')
        module.exports = api;
    else {
        if (typeof (T) === 'undefined')
            T = {};
        T.serializer = api;
    }
})();

