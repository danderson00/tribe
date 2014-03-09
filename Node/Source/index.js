module.exports = {
    start: function (setOptions) {
        var options = require('tribe/options').apply(setOptions);
        require('tribe/server/build').configure();

        // This is just to load sagas for the moment. It will be replaced by individual resource loading with require.
        require(options.basePath + 'Build/server.js');

        var server = require('tribe/server/http').start();
        require('tribe/server/socket').start(server);
    }
};