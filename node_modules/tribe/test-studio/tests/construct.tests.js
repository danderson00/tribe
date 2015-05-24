var construct = require('../modules/construct');

suite('tribe.test-studio.construct', function () {
    test("extendFixture recursively maps fixtures", function () {
        var mapped = construct.extendFixture({ fixtures: [{ fixtures: [{ title: 'fixture' }] }] });
        expect(mapped.fixtures()[0].fixtures()[0].title).to.equal('fixture');
    });

    test("extendFixture maps tests", function () {
        var mapped = construct.extendFixture({ fixtures: [{ tests: [{ title: 'test' }] }] });
        expect(mapped.fixtures()[0].tests()[0].title).to.equal('test');
    });
});