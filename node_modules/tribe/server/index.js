var http = require('./http'),
    socket = require('./socket'),
    services = require('./services'),
    
    options;

module.exports = {
    configure: function (setOptions) {
        options = setOptions;
        http.configure(options.modules);
        services.registerModules(options.services);
        return module.exports;
    },
    start: function () {
        http.start();
        socket.start(options.operations);
        return module.exports;
    }
};