
window.eval("\n(function () {\n    var level = 4;\n    var levels = {\n        debug: 4,\n        info: 3,\n        warn: 2,\n        error: 1,\n        none: 0\n    };\n\n    var api = {\n        setLevel: function (newLevel) {\n            level = levels[newLevel];\n            if (level === undefined) level = 4;\n        },\n        debug: function (message) {\n            if (level >= 4)\n                console.log(('DEBUG: ' + message));\n        },\n        info: function (message) {\n            if (level >= 3)\n                console.info(('INFO: ' + message));\n        },\n        warn: function (message) {\n            if (level >= 2)\n                console.warn(('WARN: ' + message));\n        },\n        error: function (message, error) {\n            if (level >= 1)\n                console.error(('ERROR: ' + message + '\\n'), api.errorDetails(error));\n        },\n        errorDetails: function (ex) {\n            if (!ex) return '';\n            return (ex.constructor === String) ? ex :\n                (ex.stack || '') + (ex.inner ? '\\n\\n' + this.errorDetails(ex.inner) : '\\n');\n        }\n    };\n    api.log = api.debug;\n    \n    if (typeof (exports) !== 'undefined' && typeof (module) !== 'undefined')\n        module.exports = api;\n    else {\n        if (typeof (T) === 'undefined')\n            T = {};\n        T.logger = api;\n    }\n})();\n\n\n//@ sourceURL=http://Tribe.Common/Source/logger.js");


window.eval("\n(function () {\n    // man... this cross-platform stuff sucks...\n    var ko;\n    if (typeof (window) !== 'undefined')\n        ko = window.ko;\n    if (typeof (require) !== 'undefined')\n        ko = require('knockout');\n\n    var api = {\n        serialize: function (source) {\n            return JSON.stringify(this.extractMetadata(source));\n        },\n        extractMetadata: function (source) {\n            var target = source,\n                metadata = {};\n            removeObservables();\n            return {\n                target: target,\n                metadata: metadata\n            };\n\n            function removeObservables() {\n                metadata.observables = [];\n                for (var property in target)\n                    if (target.hasOwnProperty(property) && ko.isObservable(target[property])) {\n                        target[property] = target[property]();\n                        metadata.observables.push(property);\n                    }\n\n            }\n        },\n        deserialize: function (source) {\n            source = JSON.parse(source);\n            if (source.target)\n                return this.applyMetadata(source.target, source.metadata);\n            return source;\n        },\n        applyMetadata: function (target, metadata) {\n            if (metadata)\n                restoreObservables();\n            return target;\n\n            function restoreObservables() {\n                var observables = metadata.observables;\n                for (var i = 0, l = observables.length; i < l; i++)\n                    restoreProperty(observables[i]);\n            }\n\n            function restoreProperty(property) {\n                target[property] = createObservable(target[property]);\n            }\n\n            function createObservable(value) {\n                return value.constructor === Array ?\n                    ko.observableArray(value) :\n                    ko.observable(value);\n            }\n        }\n    };\n\n    if (typeof (exports) !== 'undefined' && typeof (module) !== 'undefined')\n        module.exports = api;\n    else {\n        if (typeof (T) === 'undefined')\n            T = {};\n        T.serializer = api;\n    }\n})();\n\n//@ sourceURL=http://Tribe.Common/Source/serializer.js");
