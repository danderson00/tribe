module.exports = {
    serialize: function (source) {
        return JSON.stringify(this.extractMetadata(source), function (key, value) {
            return ko.unwrap(value);
        });
    },
    deserialize: function (source) {
        source = JSON.parse(source);
        if (source.target)
            return this.applyMetadata(source.target, source.metadata);
        return source;
    },
    extractMetadata: function (source) {
        return {
            target: source,
            metadata: {
                observables: extractObservables(source)
            }
        };

        function extractObservables(object, metadata, propertyExpression) {
            metadata = metadata || [];

            if (ko.isObservable(object)) {
                metadata.push(propertyExpression);
                object = object();
            }

            for (var property in object) {
                if (object.hasOwnProperty(property)) {
                    var fullPropertyExpression = constructPropertyExpression(property);

                    if (ko.isObservable(object[property]))
                        metadata.push(fullPropertyExpression);

                    // recurse
                    var value = ko.unwrap(object[property]);
                    if (value) {
                        if (value.constructor === Object)
                            extractObservables(value, metadata, fullPropertyExpression);
                        else if (value.constructor === Array)
                            for (var i = 0, l = value.length; i < l; i++)
                                extractObservables(value[i], metadata, arrayPropertyExpression(fullPropertyExpression, i));
                    }
                }
            }
            return metadata;

            function constructPropertyExpression(property) {
                return propertyExpression ? propertyExpression + '.' + property : property;
            }

            function arrayPropertyExpression(property, index) {
                return property + '[' + index + ']';
            }
        }
    },
    applyMetadata: function (object, metadata) {
        if (metadata)
            restoreObservables();
        return object;

        function restoreObservables() {
            var observables = metadata.observables;
            for (var i = 0, l = observables.length; i < l; i++)
                restoreProperty(object, observables[i]);
        }

        function restoreProperty(target, property) {
            var dotIndex = property.indexOf('.');
            if (dotIndex > -1) {
                var thisProperty = property.substring(0, dotIndex),
                    remainder = property.substring(dotIndex + 1);
                restoreProperty(resolveProperty(target, thisProperty), remainder);
            } else {
                restoreArrayProperty(target, property);
            }
        }

        function resolveProperty(target, property) {
            var matches = property.match(/(.*)\[(.*)]/);

            if (matches && matches.length === 3) {
                var arrayProperty = matches[1],
                    index = matches[2];
                return ko.unwrap(target[arrayProperty])[index];
            }
            return ko.unwrap(target[property]);
        }

        function restoreArrayProperty(target, property) {
            var matches = property.match(/(.*)\[(.*)]/);

            if (matches && matches.length === 3) {
                var arrayProperty = matches[1],
                    index = matches[2];
                return target[arrayProperty][index] = createObservable(target[arrayProperty][index]);
            }
            return target[property] = createObservable(target[property]);
        }

        function createObservable(value) {
            return (value && value.constructor === Array) ?
                ko.observableArray(value) :
                ko.observable(value);
        }
    }
};
