﻿suite('tribe.load', function () {
    var path = require('path'),
        load = require('tribe/test/load');

    test("loading a file executes content", function () {
        return load.file(__dirname + '/../../files/load/basic/test.js')
            .then(function (value) {
                expect(value).to.equal('test');
            });
    });

    test("loading a directory executes all content", function () {
        return load.directory(__dirname + '/../../files/load/basic')
            .then(function (values) {
                expect(values).to.deep.equal(['test', 'test2']);
            });
    });

    test("load includes require, __dirname and __filename arguments", function () {
        return load.file(__dirname + '/../../files/load/args/builtins.js')
            .then(function (value) {
                expect(typeof (value.require)).to.equal('function');
                expect(__dirname).to.be.ok;
                expect(__filename).to.be.ok;
            });
    });

    test("require operates as expected from a loaded file", function () {
        require.refresh('counter');
        return load.file(__dirname + '/../../files/load/args/require.js')
            .then(function (value) {
                expect(value).to.equal(1);
            });
    });

    test("arguments passed to load are available in loaded file", function () {
        return load.file({ path: __dirname + '/../../files/load/args/customArg.js', args: { customArg: 'test' } })
            .then(function (value) {
                expect(value).to.equal('test');
            });
    });

    test("requireExtensions are extended onto local require function", function () {
        var spy = sinon.spy();
        return load.file({ path: __dirname + '/../../files/load/args/requireExtensions.js', requireExtensions: { test: spy } })
            .then(function () {
                expect(spy.calledOnce).to.be.true;
            });
    });
});
