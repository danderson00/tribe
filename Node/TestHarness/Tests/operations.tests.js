var operations = require('operations');

suite('tribe.testharness.operations', function () {
    test("extendFixture recursively maps fixtures", function () {
        var mapped = operations.extendFixture({ fixtures: [{ fixtures: [{ title: 'fixture' }] }] });
        expect(mapped.fixtures()[0].fixtures()[0].title).to.equal('fixture');
    });

    test("extendFixture maps tests", function () {
        var mapped = operations.extendFixture({ fixtures: [{ tests: [{ title: 'test' }] }] });
        expect(mapped.fixtures()[0].tests()[0].title).to.equal('test');
    });
});