var construct = require('tribe/test/mocha/construct'),
    Mocha = require('mocha'),
    mocha = new Mocha();

suite('tribe.test.mocha.construct', function () {
    suiteSetup(function () {
        var a1 = Mocha.Suite.create(mocha.suite, 'a.a1'),
            a2 = Mocha.Suite.create(mocha.suite, 'a.a2'),
            b1 = Mocha.Suite.create(mocha.suite, 'b.b1'),
            b2 = Mocha.Suite.create(mocha.suite, 'b.b2');

        a1.addTest(new Mocha.Test('aa11', function () { }));
        a1.addTest(new Mocha.Test('aa12', function () { }));
        a2.addTest(new Mocha.Test('aa21', function () { }));
        a2.addTest(new Mocha.Test('aa22', function () { }));
        b1.addTest(new Mocha.Test('bb11', function () { }));
        b1.addTest(new Mocha.Test('bb12', function () { }));
        b2.addTest(new Mocha.Test('bb21', function () { }));
        b2.addTest(new Mocha.Test('bb22', function () { }));
    });

    test("suite structure is created and tests are added", function () {
        var suite = construct.suite(mocha, [{ fixture: 'a.a1', title: 'aa11' }, { fixture: 'b.b2', title: 'bb21' }]);
        expect(suite.suites.length).to.equal(2);
        expect(suite.suites[0].suites.length).to.equal(1);
        expect(suite.suites[1].suites.length).to.equal(1);
        expect(suite.suites[0].suites[0].tests[0].title).to.equal('aa11');
        expect(suite.suites[1].suites[0].tests[0].title).to.equal('bb21');
    });
});