﻿suite('tribe.build.blocks', function () {
    var build = require('tribe/build'),
        utils = require('tribe/utilities'),
        path = require('path'),
        templates = build.templates,
        context,
        b = { appPath: utils.paths.appPath(targetPath('')) };

    setup(function () {
        context = {};
    });

    // expecting test3.js to be the first element in the array may be flaky
    test("addFilesToContext", function () {
        return getBlock('addFilesToContext')('test', targetPath('simple'))(context, b)
            .then(function () {
                expect(context.test.length).to.equal(3);
                expect(context.test[0].path).to.have.string('test3.js');
                expect(context.test[0].content).to.equal('//3');
            });
    });

    test("addFilesToContext filters files if requested", function () {
        return getBlock('addFilesToContext')('test', targetPath('simple'), /child/)(context, b)
            .then(function () {
                expect(context.test.length).to.equal(1);
            });
    });

    test("addFilesToContext excludes content if requested", function () {
        return getBlock('addFilesToContext')('test', targetPath('simple'), null, false)(context, b)
            .then(function () {
                expect(context.test.length).to.equal(3);
                expect(context.test[0].content).to.be.undefined;
            });
    });

    test("browserify", function () {
        return getBlock('addFilesToContext')('test', targetPath('browserify'), null, false)(context, b)
            .then(function () {
                return getBlock('browserify')('test').to()(context, b);
            })
            .then(function (result) {
                expect(result).to.have.string('//2');
            });
    });

    test("combineContents", function () {
        context.test = [{ content: '1' }, { content: '2' }, { content: '3' }];
        var result = getBlock('combineContents')('test').to()(context, b);
        expect(result).to.equal('1\n2\n3');
    });

    test("renderTemplate", function () {
        templates.add('test', '-<%=context.test + data.testValue%>-');
        context.test = 'value';
        var result = getBlock('renderTemplate')('test', { testValue: 'testValue' }).to()(context, b);
        expect(result).to.equal('-valuetestValue-');
    });

    function getBlock(name) {
        return require('tribe/build/blocks/' + name);
    }

    function targetPath(name) {
        return path.resolve(__dirname, '../../files/blocks/', name);
    }
});