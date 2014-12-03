﻿var express = require('express'),
    useragent = require('express-useragent'),
    app = express(),
    server = require('http').createServer(app),
    response = require('./response'),
    options = require('tribe/options'),
    log = require('tribe.logger'),
    _ = require('underscore');

var api = module.exports = {
    configure: function (modules) {
        app.use(useragent.express());

        _.each(modules, api.addModule);
        return api;
    },
    start: function () {
        server.listen(options.port);
        log.info('Server listening on port ' + options.port);
        return api;
    },
    addModule: function (module) {
        return module.http(app);
    },
    route: function (route) {
        return app.route(route);
    },
    response: response,
    app: app,
    server: server
};