var Mocha = require('mocha'),
    convert = require('tribe/test/mocha/convert');

suite('tribe.test.mocha.convert', function () {
    test('convert suite adds individual tests', function () {
        var suite = new Mocha.Suite('root');
        suite.addTest(new Mocha.Test('test1'));
        suite.addTest(new Mocha.Test('test2'));

        var fixture = convert.suite(suite);
        expect(fixture.tests.length).to.equal(2);
        expect(fixture.tests[0].title).to.equal('test1');
    });

    test('convert suite adds child suites', function () {
        var suite = new Mocha.Suite('root'),
            child1 = Mocha.Suite.create(suite, 'child1'),
            child2 = Mocha.Suite.create(suite, 'child2'),
            child3 = Mocha.Suite.create(child1, 'child3');

        var fixture = convert.suite(suite);
        expect(fixture.fixtures.length).to.equal(2);
        expect(fixture.fixtures[0].title).to.be.equal('child1');
        expect(fixture.fixtures[0].fixtures.length).to.equal(1);
    });
});