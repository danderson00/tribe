﻿// takes too long... need categories!

//var options = require('tribe/options'),
//    memory = require('tribe/server/modules/memory'),
//    path = require('path'),
//    fs = require('fs'),
//    context;

//suite('tribe.build.integration', function () {
//    test("tests.agent is built", function () {
//        options.debug = true;
//        options.showDependencies = false;

//        context = {};

//        require.refresh(/build\\activities/);
//        var build = require('tribe/build');
//        build.activities.loadBuiltin();
//        return build.configure({
//            name: 'testAgent',
//            path: path.resolve(__dirname, '../../files/build/') + '\\',
//            phases: ['prepare', 'render', 'output', 'server'],
//            tasks: [
//                { activity: 'tests.agent' },
//                { activity: 'tests.browser', options: { path: 'tests/client' } }
//            ]
//        })
//            .execute(context)
//            .then(function () {
//                expect(context.tests.length).to.equal(2);

//                var js = output('tests.agent.js'),
//                    html = output('tests.agent.html');

//                expect(js).to.have.string('//one');
//                expect(js).to.have.string('//two');
//                expect(js).to.have.string("require('tribe/test').register(");                       //build/activities/tests/agent.js
//                expect(js).to.have.string("pubsub.subscribe('test.run', module.exports.run);");     //test/mocha/browser.js

//                expect(html).to.have.string('<script type="text/javascript" src="tests.agent.js"></script>');
//            });
//    })
//});

//function output(file) {
//    return memory.collections['testAgent'][file];
//}
