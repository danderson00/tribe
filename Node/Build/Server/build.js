module.exports = {
    configure: function () {
        var pack = require('packscript').pack,
            options = resolve('/options');

        Pack.context.configPath = options.basePath;
        Pack.api.Log.setLevel('info');
        pack.options.throttleTimeout = 0;

        pack([
            T.scripts('Infrastructure', true),
            T.panes('Panes', true),
            T.sagas('Sagas', true)
        ]).to('Build/site.js');

        pack({
            include: [T.sagas('Sagas')],
            outputTemplate: 'TC.wrapper'
        }).to('Build/server.js');

        pack([T.scripts('Dependencies/*.js'), T.scripts('node_modules/tribe/client/*.debug.js')]).to('Build/dependencies.js');

        pack({ outputTemplate: 'index' }).to('Build/index.html');

        pack.scanForResources(__dirname + '/../pack/')
            .all()
            .watch(options.basePath);
    }
};