suite('tribe.load', function () {
    var path = require('path');

    test("loading a file executes content", function (done) {
        return require('tribe/load').file(__dirname + '/../load/basic/test.js')
            .then(function (value) {
                expect(value).to.equal('test');
            });
    });

    test("loading a directory executes all content", function (done) {
        return require('tribe/load').directory(__dirname + '/../load/basic')
            .then(function (values) {
                expect(values).to.deep.equal(['test', 'test2']);
            });
    });

    test("load includes require, __dirname and __filename arguments", function (done) {
        return require('tribe/load').file(__dirname + '/../load/args/builtins.js')
            .then(function (value) {
                expect(typeof (value.require)).to.equal('function');
                expect(__dirname).to.be.ok;
                expect(__filename).to.be.ok;
            });
    });

    test("require operates as expected from a loaded file", function (done) {
        return require('tribe/load').file(__dirname + '/../load/args/require.js')
            .then(function (value) {
                expect(value).to.equal(1);
            });
    });

    test("arguments passed to load are available in loaded file", function (done) {
        return require('tribe/load').file({ path: __dirname + '/../load/args/customArg.js', args: { customArg: 'test' } })
            .then(function (value) {
                expect(value).to.equal('test');
            });
    });
});
