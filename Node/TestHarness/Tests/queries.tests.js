suite('tribe.testharness.queries', function () {
    var suite, queries;

    setup(function () {
        suite = { fixtures: ko.observableArray(), tests: ko.observableArray() };
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

    test("allTests returns flattened array of tests", function () {
        suite.fixtures.push({
            tests: ko.observableArray([1, 2, 3]),
            fixtures: ko.observableArray([{
                tests: ko.observableArray([4, 5]),
                fixtures: ko.observableArray()
            }, {
                tests: ko.observableArray([6, 7]),
                fixtures: ko.observableArray()
            }])
        });
        var tests = queries.allTests();
        expect(tests.length).to.equal(7);
        expect(tests).to.deep.equal([1, 2, 3, 4, 5, 6, 7]);
    });

    test("filter returns tests that pass a truth test", function () {
        suite.fixtures.push({
            tests: ko.observableArray([1, 2, 3]),
            fixtures: ko.observableArray([{
                tests: ko.observableArray([4, 5]),
                fixtures: ko.observableArray()
            }, {
                tests: ko.observableArray([6, 7]),
                fixtures: ko.observableArray()
            }])
        });
        var tests = queries.filter(function (test) {
            return test > 2 && test < 5;
        });
        expect(tests.length).to.equal(2);
        expect(tests).to.deep.equal([3, 4]);
    });

});