var utils = require('tribe/utilities'),
    options = require('tribe/options'),
    log = require('tribe.logger'),
    browserify = require('browserify'),
    path = require('path'),
    fs = require('fs'),
    Q = require('q'),
    _ = require('underscore');

module.exports = function (property, configCallback) {
    // pass args in any order
    var args = utils.arguments(arguments);
    configCallback = args.func;
    property = args.string;

    return {
        to: function (targetPath, targetProperty, dependenciesProperty) {
            targetProperty = targetProperty || 'output';

            return function (context, build) {
                var b = browserify({ paths: [__dirname] }),
                    bundleQ = Q.defer(),
                    dependencyQ = Q.defer(),
                    q = Q.defer(),
                    results = { content: '', dependencies: {} };

                try {
                    if (configCallback) configCallback(b, context[property], context);

                    _.each(context[property], function (file) {
                        b.add(file.path);
                    });

                    var opts = { debug: options.debug && !options.enhancedDebug };

                    b.bundle(opts)
                        .on('data', readContent)
                        .on('error', error('content', bundleQ))
                        .on('end', function () {
                            context[targetProperty] = context[targetProperty] || {};
                            context[targetProperty][targetPath] = results.content;
                            bundleQ.resolve();
                        });

                    //if (dependenciesProperty)
                    //    b.deps(opts)
                    //        .on('data', readDependency)
                    //        .on('error', error('dependencies', dependencyQ))
                    //        .on('end', function () {
                    //            context[dependenciesProperty] = results.dependencies;
                    //            dependencyQ.resolve();
                    //        });
                    //else
                        dependencyQ.resolve();

                    function readContent(data) {
                        results.content += data;
                    }

                    function readDependency(dep) {
                        results.dependencies[dep.id] = dep;
                    }

                    function error(property, promise) {
                        return function (error) {
                            log.error('Failed to browserify \'' + targetProperty + '\' ' + property, JSON.stringify(error));
                            promise.reject(error);
                        };
                    }

                } catch (ex) {
                    q.reject(ex);
                }
                
                // we could just say return Q.all, but we want to resolve the promise with content as the argument
                Q.all([bundleQ.promise, dependencyQ.promise]).then(function () {
                    q.resolve(results.content);
                }).fail(q.reject);

                return q.promise;
            };
        }
    };
};
