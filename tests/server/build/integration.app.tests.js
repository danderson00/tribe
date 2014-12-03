﻿var options = require('tribe/options'),
    memory = require('tribe/server/modules/memory'),
    path = require('path'),
    fs = require('fs'),
    context;

suite('tribe.build.integration', function () {
    test("app is built", function () {
        options.debug = true;
        options.enhancedDebug = true;
        options.showDependencies = false;

        context = {};

        require.refresh(/build\\activities/);
        var build = require('tribe/build');
        build.activities.loadBuiltin();
        return build.configure({
            name: 'testApp',
            path: path.resolve(__dirname, '../../files/build/') + '\\',
            phases: ['prepare', 'render', 'output', 'server'],
            tasks: [
                { activity: 'app' },
                { activity: 'dependencies', options: { path: 'dependencies' } },
                { activity: 'panes', options: { path: 'panes' } },
                { activity: 'resources', options: { path: 'resources' } },
                { activity: 'scripts', options: { path: 'scripts' } },
                { activity: 'styles', options: { path: 'styles' } },
                { activity: 'templates', options: { path: 'templates' } }
            ]
        })
            .execute(context)
            .then(function () {
                expect(context.dependencies.length).to.equal(1);
                //expect(context.js.length).to.equal(7); // 3 test files + 7 built in client
                expect(context.css.length).to.equal(2);
                expect(context.html.length).to.equal(2);

                var js = output('app.js'),
                    css = output('app.css'),
                    html = output('app.htm');

                expect(js).to.have.string('//pane');
                expect(js).to.have.string('//resource');
                expect(js).to.have.string('//script');
                expect(js).to.have.string("T.scriptEnvironment = { resourcePath: '/resource' };\n");    //build/blocks/browserify.js
                expect(js).to.have.string('actors.register');                                           //client/register.js
                expect(js).to.have.string('//@ sourceURL=');                                            //build/activities/app.js /utilities/browserify.js
                expect(js).to.have.string('var hub = module.exports');                                  //client/hub.js

                expect(css).to.have.string('/*pane*/');
                expect(css).to.have.string('/*style*/');

                expect(html).to.have.string('src="dependencies/dependency.js"');
                expect(html).to.have.string('id="template--pane"');
                expect(html).to.have.string('id="template--template"');

                expect(isLoaded('resources/resource.js')).to.be.true;
            });
    })
});

function output(file) {
    return memory.collections['testApp'][file];
}

function isLoaded(file) {
    return require.cache.hasOwnProperty(path.resolve(__dirname, '../../files/build', file));
}