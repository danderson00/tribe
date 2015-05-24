var utils = require('tribe/utilities'),
    path = require('path'),
    fs = require('q-io/fs'),
    _ = require('underscore');

module.exports = function (property) {
    var combine = {
        to: function (targetPath, targetProperty) {
            targetProperty = targetProperty || 'output';

            return function (context) {
                var result = _.pluck(context[property], 'content').join('\n');
                if (targetPath) {
                    context[targetProperty] = context[targetProperty] || {};
                    context[targetProperty][targetPath] = result;
                }
                return result;
            };
        }
    };
    return combine;
};