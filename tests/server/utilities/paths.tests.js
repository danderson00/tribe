﻿var options = require('tribe/options'),
    paths = require('tribe/utilities/paths'),
    appPath = paths.appPath('c:\\test\\');

suite('tribe.utilities.paths', function () {
    test("appPath.resolve appends path to basePath", function () {
        expect(appPath.resolve('test.js')).to.equal('c:\\test\\test.js');
        expect(appPath.resolve('test/test.js')).to.equal('c:\\test\\test\\test.js');
    });

    test("appPath.resolve returns passed path when absolute", function () {
        expect(appPath.resolve('C:\\test.js')).to.equal('c:\\test.js');
    });

    test("appPath.for finds path relative to basePath", function () {
        expect(appPath.for('c:\\test\\test.js')).to.equal('test.js');
        expect(appPath.for('c:\\test\\test2\\test.js')).to.equal('test2/test.js');
    });

    test("resourcePathFor removes file extension and leading resource path", function () {
        expect(appPath.resourcePathFor('c:\\test\\test.js')).to.equal('/test');
        expect(appPath.resourcePathFor('c:\\test\\test\\test.htm')).to.equal('/test/test');
        expect(appPath.resourcePathFor('c:\\test\\test\\test.htm', 'test')).to.equal('/test');
    });

    test("markupIdentifierFor prepends type and replaces special characters", function () {
        expect(paths.markupIdentifierFor('/test/test', 'template')).to.equal('template--test-test');
    });

    test("locatedIn", function () {
        expect(paths.locatedIn('/test', '/test/test.htm')).to.be.true;
        expect(paths.locatedIn('/test/', '/test/test.htm')).to.be.true;
        expect(paths.locatedIn('/test', '/test2/test.htm')).to.be.false;
        expect(paths.locatedIn('/test', '/test/test2/test.htm')).to.be.true;
        expect(paths.locatedIn('/test/test2', '/test/test.htm')).to.be.false;
        expect(paths.locatedIn('test', 'test/test.htm')).to.be.true;
        expect(paths.locatedIn('test', 'test2/test.htm')).to.be.false;
    });
});