var http = require('tribe/server/http'),
    options = require('tribe/options'),
    log = require('tribe.logger'),
    Q = require('q'),
    _ = require('underscore'),
    handlers = {};

var services = module.exports = {
    handlers: handlers,
    register: function (name, handler) {
        handlers[name] = handler;
        log.debug('Registered service ' + name);
    },
    registerModules: function (modules) {
        _.each(modules, function (moduleName, serviceName) {
            services.register(serviceName, require(moduleName));
        });
    },
    invoke: function (name, args) {
        if (handlers[name])
            return handlers[name].apply(null, args);
        else
            throw new Error('Requested service "' + name + '" has not been registered.');
    }
};

// for security reasons, this should be post in production...
// [options.debug ? 'all' : 'post']
http.route('/services').all(function (req, res) {    
    return Q.when(services.invoke(req.param('name'), req.param('args')))
        .then(function (result) {
            res.send(result);
        })
        .fail(http.response.fail(req, res));
});
