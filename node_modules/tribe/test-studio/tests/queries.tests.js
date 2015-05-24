suite('tribe.test-studio.queries', function () {
    var suite, queries;

    setup(function () {
        suite = { fixtures: ko.observableArray(), tests: ko.observableArray() };
        queries = require('../modules/queries').for(suite);
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

    test("findResult creates result for agent", function () {
        var test = queries.findTest({ title: 'test', fixture: 'test1' }),
            result = queries.findResult('server', test);
        expect(test.results().length).to.equal(1);
        expect(test.results()[0]).to.equal(result);
        expect(result.agent).to.equal('server');
    });

    test("findResult finds existing result", function () {
        var test = queries.findTest({ title: 'test', fixture: 'test1' }),
            newResult = queries.findResult('server', test),
            existingResult = queries.findResult('server', test);
        expect(existingResult).to.equal(newResult);
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

    test("where returns tests where the specified property equals the specified value", function () {
        suite.fixtures.push({
            tests: ko.observableArray([{ test: 1 }, { test: 2 }, { test: 2 }]),
            fixtures: ko.observableArray([{
                tests: ko.observableArray([{ test: 1 }, { test: 2 }]),
                fixtures: ko.observableArray()
            }, {
                tests: ko.observableArray([{ test: 2 }, { test: 1 }]),
                fixtures: ko.observableArray()
            }])
        });
        var tests = queries.where('test', 2);
        expect(tests.length).to.equal(4);
    });

    test("allResults returns flattened array of results", function () {
        suite.fixtures.push({
            tests: ko.observableArray([{ results: ko.observableArray([1]) }, { results: ko.observableArray([2]) }]),
            fixtures: ko.observableArray([{
                tests: ko.observableArray([{ results: ko.observableArray([3]) }, { results: ko.observableArray([4]) }]),
                fixtures: ko.observableArray()
            }, {
                tests: ko.observableArray([{ results: ko.observableArray([5]) }, { results: ko.observableArray([6]) }]),
                fixtures: ko.observableArray()
            }])
        });
        var results = queries.allResults();
        expect(results).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });

    test("resultsWhere returns results where the specified property equals the specified value", function () {
        suite.fixtures.push({
            tests: ko.observableArray([{ results: ko.observableArray([{ test: 1 }]) }, { results: ko.observableArray([{ test: 1 }]) }]),
            fixtures: ko.observableArray([{
                tests: ko.observableArray([{ results: ko.observableArray([{ test: 2 }]) }, { results: ko.observableArray([{ test: 1 }]) }]),
                fixtures: ko.observableArray()
            }, {
                tests: ko.observableArray([{ results: ko.observableArray([{ test: 2 }]) }, { results: ko.observableArray([{ test: 1 }]) }]),
                fixtures: ko.observableArray()
            }])
        });
        var results = queries.resultsWhere('test', 1);
        expect(results.length).to.equal(4);
    });
});