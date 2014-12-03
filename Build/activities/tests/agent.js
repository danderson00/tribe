﻿var build = require('tribe/build'),
    options = require('tribe/options'),
    utils = require('tribe/utilities'),
    log = require('tribe.logger'),
    memory = require('tribe/server/modules/memory'),
    test = require('tribe/test');

build.activities.register('tests.agent', function () {
    return {
        render: function (context, buildOptions) {
            build.blocks('renderTemplate')('tests.agent', { options: browserOptions() }).to('tests.agent.html', 'tests.agent')(context, buildOptions);
            return build.blocks('browserify')('tests', configure).to('tests.agent.js', 'tests.agent')(context, buildOptions);

            function configure(b, files) {
                b.exclude('./lib-cov/mocha');
                b.ignore('./html-cov');
                b.require(require.resolve('tribe/node_modules/mocha/lib/reporters/dot'), { expose: './reporters/dot' });

                b.require(require.resolve('tribe/client/testAgent'), { expose: 'tribe/client/testAgent' });
                b.require(require.resolve('tribe/test/mocha/browser'), { expose: 'tribe/test' });
                b.require(require.resolve('tribe/options.browser'), { expose: 'tribe/options' });
                b.require(require.resolve('tribe/client'), { expose: 'tribe' });

                b.external('tribe.pubsub');
                b.external('tribe/actors');

                b.transform(utils.streams.throughTransform(function (source, file) {
                    if (options.debug && options.enhancedDebug && !file.path.match(/enhancedDebug\.js$/))
                        source = utils.browserify.prepareForDebug(source, file.path, buildOptions.path);

                    if (!file.appPath)
                        return source;

                    // add placeholder properties for infrastructure provided on client
                    // structure is duplicated in tribe/test/mocha/browser - a tad flaky!
                    var context = { expect: '', assert: '', sinon: '' };
                    test.mocha.suite.emit('pre-require', context, file.appPath, test.mocha);
                    return "require('tribe/test').register('" + file.appPath + "', " + utils.script.wrapper(source, context) + ");\n";
                }, files));
            }
        },
        output: function (context, b) {
            memory.register(b.name || 'tests.agent', context['tests.agent']);
            log.debug('Test agent build: ' + utils.log.contentSize(context['tests.agent']));
        }
    };
});

function browserOptions() {
    return JSON.stringify({
        test: options.test
    });
}