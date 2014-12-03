var resources = require('tribe/utilities/files'),
    path = require('path'),
    fs = require('fs'),
    _ = require('underscore'),
    factories = {};

module.exports = {
    register: function (name, factory) {
        factories[name] = factory;
    },
    createTask: function (spec) {
        if (!factories[spec.activity])
            throw new Error("The activity '" + spec.activity + "' has not been registered.");
        return factories[spec.activity](spec.options);
    }, 
    loadBuiltin: function () {
        loadFrom(path.resolve(__dirname, 'activities'));
    }
};

function loadFrom(from) {
    _.each(fs.readdirSync(from), function (filename) {
        var full = path.resolve(from, filename);
        if (fs.statSync(full).isDirectory())
            loadFrom(full);
        else
            require(full);
    });
}