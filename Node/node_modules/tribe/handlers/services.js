var http = require('tribe/server/http'),
    options = require('tribe/options'),
    Q = require('q'),
    handlers = {};

var services = module.exports = {
    handlers: handlers,
    register: function (name, handler) {
        handlers[name] = handler;
    },
    invoke: function (name, args) {
        if (handlers[name])
            return handlers[name].apply(null, args);
        else
            throw new Error('Requested service "' + name + '" has not been registered.');
    }
};

http.registerService('/Services', function (req, res) {    
    return Q.when(services.invoke(req.query.name || req.params.name, req.query.args || req.params.args))
        .then(function (result) {
            res.send(result);
        });
}, options.debugPort ? 'all' : 'post');
