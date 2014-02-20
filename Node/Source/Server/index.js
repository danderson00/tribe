require('./resolve.js');

module.exports = {
    start: function (setOptions) {
        var options = resolve('/options').apply(setOptions);
        resolve('/Server/build').configure();

        // This is just to load sagas for the moment. It will be replaced by individual resource loading with require.
        resolve(options.basePath + 'Build/server.js');

        var server = resolve('/Server/http').start();
        resolve('/Server/socket').start(server);
    }
};