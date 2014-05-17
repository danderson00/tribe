var Mocha = require('mocha'),
    overrides = require('tribe/test/mocha/overrides');

suite('tribe.test.mocha.overrides', function () {
    suite('Suite.create', function () {
        test("suite heirarchy is created if it doesn't exist", function () {
            var root = new Mocha.Suite(),
                suite = Mocha.Suite.create(root, 'test1.test2.test3');
            expect(root.suites[0].title).to.equal('test1');
            expect(root.suites[0].suites[0].title).to.equal('test2');
            expect(root.suites[0].suites[0].suites[0].title).to.equal('test3');
        });

        test("existing heirarchy is used if it exists", function () {
            var root = new Mocha.Suite(),
                suite1 = Mocha.Suite.create(root, 'test1.test2.test3'),
                suite2 = Mocha.Suite.create(root, 'test1.test2.test4');
            expect(root.suites.length).to.equal(1);
            expect(root.suites[0].suites.length).to.equal(1);
            expect(root.suites[0].suites[0].suites.length).to.equal(2);
            expect(root.suites[0].suites[0].suites[1].title).to.equal('test4');
        });
    });
});