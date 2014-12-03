﻿var _ = require('underscore'),
    streams = require('./streams'),
    script = require('./script');

module.exports = {
    dependencies: function (dependencies) {
        // could make this a generic hashFromArray function that you pass a property name to
        var dependencyHash = _.reduce(dependencies, function (hash, dependency) {
            hash[dependency.id] = dependency;
            return hash;
        }, {});

        return {
            trees: _.map(_.where(dependencies, { entry: true }), mapDependencies),
            files: _.pluck(dependencyHash, 'id')
        };

        function mapDependencies(dependency, mapped) {
            mapped = _.extend({}, mapped);
            mapped[dependency.id] = true;

            return {
                id: dependency.id,
                deps: _.reduce(dependency.deps, function (tree, id, ref) {
                    tree[ref] = mapped[id] ?
                        { id: id, deps: { circular: { } } } :
                        mapDependencies(dependencyHash[id], mapped);
                    return tree;
                }, {})
            };
        }
    },
    toDisplayTree: function (trees, name) {
        return {
            label: 'Dependencies' + (name ? ' - ' + name : ''),
            nodes: _.map(trees, function (tree) {
                return map(tree);
            })
        };

        function map(node, label) {
            return {
                label: label || node.id,
                nodes: _.map(node.deps, map)
            };
        }
    },
    prepareForDebug: function (source, path, basePath) {
        return 'require("tribe/client/enhancedDebug").execute("' +
            script.prepareForEval(source) +
            script.sourceUrlTag(path, basePath) +
            '", arguments, window, require, module, exports);\n' +
            // we need to include the source outside of a string so browserify picks up the require statements.
            // grossly inefficient, but only for debug mode...
            '(function () {' + source + '})';
    }
};