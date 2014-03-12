var Mocha = require('mocha'),
    convert = require('tribe/test/mocha/convert');

suite('tribe.test.mocha.convert', function () {
    test('convert suite adds individual tests', function () {
        var suite = new Mocha.Suite('root');
        suite.addTest(new Mocha.Test('test1'));
        suite.addTest(new Mocha.Test('test2'));

        var fixture = convert.suite(suite);
        expect(fixture.tests.length).to.equal(2);
        expect(fixture.tests[0].name).to.equal('test1');
    });

    test('convert suite adds individual tests', function () {
        var suite = new Mocha.Suite('root'),
            child1 = Mocha.Suite.create(suite, 'child1'),
            child2 = Mocha.Suite.create(suite, 'child2'),
            child3 = Mocha.Suite.create(child1, 'child3');

        var fixture = convert.suite(suite);
        expect(fixture.fixtures.child1).to.be.ok;
        expect(fixture.fixtures.child2).to.be.ok;
        expect(fixture.fixtures.child1.fixtures.child3).to.be.ok;
    });
});