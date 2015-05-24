suite('tribe.test.require', function () {
    test('require returns specified stub', function () {
        var target = {};
        require.stub('counter', target);
        expect(require('counter')).to.equal(target);
    });

    test('built-in modules can be mocked', function () {
        var target = {};
        require.stub('fs', target);
        expect(require('fs')).to.equal(target);
    });

    test('require returns same instance within each test', function () {
        require.refresh('counter');
        var counter = require('counter');
        expect(counter.next()).to.equal(1);
        counter = require('counter');
        expect(counter.next()).to.equal(2);
    });

    test('require returns new instance for each test #1', function () {
        require.refresh('counter');
        var first = require('counter').next();
        expect(first).to.equal(1);
    });

    test('require returns new instance for each test #2', function () {
        require.refresh('counter');
        var second = require('counter').next();
        expect(second).to.equal(1);
    });

    test('mocked dependencies are provided to nested modules', function () {
        var target = {};
        require.refresh('counter/nested');
        require.stub('./index', target);
        expect(require('counter/nested').counter).to.equal(target);
    });

    test('nested dependencies are refreshed', function () {
        var counter = require('counter');
        // refresh doesn't work if the module has been loaded previously in a test
        // the loaded collection in test/require already contains the module so it isn't refreshed
        // require.refresh('counter/nested');
        // expect(require('counter/nested').counter).to.equal(counter);

        require.refreshAll();
        expect(require('counter/nested').counter).to.not.equal(counter);
    });
});
