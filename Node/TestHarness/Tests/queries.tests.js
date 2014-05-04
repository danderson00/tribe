suite('tribe.testharness.queries', function () {
    var suite, queries;

    setup(function () {
        suite = { fixtures: ko.observableArray() };
        queries = require('queries').for(suite);
    });

    test("findFixture creates fixture structure", function () {
        queries.findFixture('test1.test2');
        expect(suite.fixtures()[0].title).to.equal('test1');
        expect(suite.fixtures()[0].fixtures()[0].title).to.equal('test2');
    });

    test("findFixture finds existing fixture", function () {
        var fixture = queries.findFixture('test1.test11');
        expect(queries.findFixture('test1.test11')).to.equal(fixture);
    });

    test("findTest creates fixture and test and adds test to fixture", function () {
        var test = queries.findTest({ title: 'test', fixture: 'test1' });
        expect(suite.fixtures()[0].tests()[0]).to.equal(test);
        expect(test.title).to.equal('test');
        expect(test.stale()).to.be.true;
    });

    test("findFixture finds existing test", function () {
        var test = queries.findTest({ title: 'test', fixture: 'test1' });
        expect(queries.findTest({ title: 'test', fixture: 'test1' })).to.equal(test);
    });

});