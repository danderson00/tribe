﻿var utils = require('tribe/utilities'),
    options = require('tribe/options'),
    templates = require('tribe/build').templates,
    path = require('path'),
    fs = require('q-io/fs'),
    _ = require('underscore');

module.exports = function (name, data) {
    return {
        to: function (targetPath, targetProperty) {
            targetProperty = targetProperty || 'output';

            return function (context) {
                var content,
                    templateData = {
                        data: data || {},
                        utils: utils,
                        context: context,
                        options: options,
                        _: _
                    };

                try {
                    content = _.template(templates(name), templateData);
                } catch (ex) {
                    utils.errors.rethrow("Error rendering template '" + name + "' to " + targetPath)(ex);
                }

                if (targetPath) {
                    context[targetProperty] = context[targetProperty] || {};
                    context[targetProperty][targetPath] = content;
                }
                return content;
            };
        }
    };
};