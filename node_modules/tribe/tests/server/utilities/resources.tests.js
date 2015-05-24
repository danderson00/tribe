var resources = require('tribe/utilities/files'),
    path = require('path'),
    sinon = require('sinon'),
    expect = require('chai').expect;

suite('tribe.utilities.resources', function () {
    test("requireDirectory requires each file in path", function () {
        return resources.requireDirectory(path.resolve(__dirname, '../../files/resources/'))
            .then(function () {
                expect(require.cache[path.resolve(__dirname, '../../files/resources/test1.js')]).to.not.be.undefined;
                expect(require.cache[path.resolve(__dirname, '../../files/resources/test2.js')]).to.not.be.undefined;
                expect(require.cache[path.resolve(__dirname, '../../files/resources/child/test3.js')]).to.not.be.undefined;
            });
    });

    test("enumerateFiles recurses by default", function (done) {
        var spy = sinon.spy();
        return resources.enumerateFiles(path.resolve(__dirname, '../../files/resources/'), spy)
            .then(function () {
                expect(spy.callCount).to.equal(3);
            });
    });

    test("enumerateFiles does not recurse when requested", function (done) {
        var spy = sinon.spy();
        return resources.enumerateFiles(path.resolve(__dirname, '../../files/resources/'), spy, false)
            .then(function () {
                expect(spy.callCount).to.equal(2);
            });
    });

    test("enumerateFiles passes full file path and relative file path", function (done) {
        var spy = sinon.spy();
        return resources.enumerateFiles(path.resolve(__dirname, '../../files/resources/'), spy)
            .then(function () {
                var expected = path.resolve(__dirname, '../../files/resources/child/test3.js');
                expected = expected[0].toLowerCase() + expected.substring(1);
                expect(spy.firstCall.args[0]).to.equal(expected);
                expect(spy.firstCall.args[1]).to.equal('\\child\\test3.js');
            });
    });
});