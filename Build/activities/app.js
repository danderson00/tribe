var build = require('tribe/build'),
    memory = require('tribe/server/modules/memory'),
    utils = require('tribe/utilities'),
    options = require('tribe/options'),
    log = require('tribe.logger'),
    archy = require('archy'),
    through = require('through'),
    _ = require('underscore');

build.activities.register('app', function () {

    return {
        render: function (context, buildOptions) {
            // first two are synchronous
            build.blocks('renderTemplate')('app').to('app.htm', 'app')(context, buildOptions);
            build.blocks('renderTemplate')('app', { mobile: true }).to('app.mobile.htm', 'app')(context, buildOptions);
            build.blocks('combineContents')('css').to('app.css', 'app')(context, buildOptions);

            return build.blocks('browserify')('js', configure).to('app.js', 'app')(context, buildOptions);

            function configure(b, files) {
                b.require(require.resolve('tribe/client'), { expose: 'tribe' });

                // modules that should be exposed to external bundles, such as tests.agent. There must be a better way to do this!
                b.require('tribe.pubsub');
                b.require('tribe/actors');

                b.transform(utils.streams.throughTransform(function (source, file) {
                    if (options.debug && options.enhancedDebug && !file.path.match(/enhancedDebug\.js$/))
                        source = utils.browserify.prepareForDebug(source, file.path, buildOptions.path);

                    return file.resourcePath ? "T.scriptEnvironment = { resourcePath: '" + file.resourcePath + "' };\n" + source : source;
                }, files));
            }
        },
        output: function (context, buildOptions) {
            memory.register(buildOptions.name || 'app', context.app);
            log.info('Build of "' + buildOptions.name + '": ' + utils.log.contentSize(context.app));

            //if(context.appDependencies)
            //    try {
            //        var deps = utils.browserify.dependencies(context.appDependencies);
            //        //log.debug(archy(utils.browserify.toDisplayTree(trees, build.name)));
            //        log.debug(deps.files.join('\n'));
            //    } catch (e) {
            //        log.error('Failed to generate dependencies for ' + build.name, e);
            //    }
        }
    };
});

