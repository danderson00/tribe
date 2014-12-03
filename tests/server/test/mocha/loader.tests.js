﻿suite('tribe.test.mocha.loader', function () {
    var Mocha = require('mocha'),
        publish,
        mocha,
        loader,
        restore;

    setup(function () {
        require.refresh('tribe/test/mocha/loader');
        require.stub('tribe.pubsub', { publish: publish = sinon.spy() });
        require.stub('tribe/test/load', {
            file: function (options) {
                options.beforeExecute();
                restore = options.afterExecute;
                return { fail: function () { } };
            }
        });
        require.stub('tribe/options', { test: {} });
        mocha = new Mocha();
        loader = require('tribe/test/mocha/loader');
        loader.loadFile(mocha, 'path.tests.js');
    });

    test("addTest override creates tests and sets filename", function () {
        mocha.suite.addTest(new Mocha.Test('title', function () { }));
        mocha.suite.addTest(new Mocha.Test('title2', function () { }));
        expect(mocha.suite.tests.length).to.equal(2);
        expect(mocha.suite.tests[0].title).to.equal('title');
        expect(mocha.suite.tests[0].filename).to.equal('path.tests.js');
        restore();
    });

    test("addTest override replaces existing tests", function () {
        mocha.suite.addTest(new Mocha.Test('title', function () { }));
        mocha.suite.addTest(new Mocha.Test('title', function () { }));
        expect(mocha.suite.tests.length).to.equal(1);
        expect(mocha.suite.tests[0].title).to.equal('title');
        restore();
    });

    test("test.loaded message is published when test is added", function () {
        mocha.suite.addTest(new Mocha.Test('title', function () { }));
        expect(publish.calledOnce).to.be.true;
        expect(publish.firstCall.args[0].topic).to.equal('test.loaded');
        restore();
    });

    test("test.removed message is published when test is removed from file", function () {
        mocha.suite.addTest(new Mocha.Test('title', function () { }));
        loader.loadFile(mocha, 'path.tests.js');
        restore();
        expect(publish.callCount).to.equal(2);
        expect(publish.secondCall.args[0].topic).to.equal('test.removed');
    });
});