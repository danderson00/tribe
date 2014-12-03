var fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    targetPath = path.resolve(__dirname, 'templates'),
    templates = {};

// we are going to do this synchronously and cache. Only occurs on first build anyway.
_.each(fs.readdirSync(targetPath), function (templatePath) {
    // use the file name as the template name
    var name = templatePath.substring(templatePath.lastIndexOf(path.sep), templatePath.lastIndexOf('.'));
    templates[name] = fs.readFileSync(path.resolve(targetPath, templatePath)).toString();
});

module.exports = function (name) {
    return templates[name];
};

module.exports.add = function (name, template) {
    templates[name] = template;
};