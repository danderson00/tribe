suite('tribe.test-studio.operations', function () {
    var operations = require('../modules/operations');

    test("updateTest sets stale if no state is provided", function () {
        var test = createTest();
        test.stale(false);
        operations.updateTest(test, {});
        expect(test.stale()).to.be.true;
    });

    test("updateTest adds a result if state is provided", function () {
        var test = createTest();
        operations.updateTest(test, { state: 'passed' });
        expect(test.results().length).to.equal(1);
        expect(test.results()[0].state()).to.equal('passed');
    });

    test("setPending sets pending on all tests in fixture if none specified", function () {
        var suite = createSuite();
        operations.setPending(suite);
        expect(suite.fixtures()[0].tests()[0].pending()).to.be.true;
        expect(suite.fixtures()[0].fixtures()[0].tests()[0].pending()).to.be.true;
        expect(suite.fixtures()[0].fixtures()[0].tests()[1].pending()).to.be.true;
        expect(suite.fixtures()[0].fixtures()[1].tests()[0].pending()).to.be.true;
        expect(suite.fixtures()[0].fixtures()[1].tests()[1].pending()).to.be.true;
    });

    test("setPending sets pending on specified tests", function () {
        var suite = createSuite();
        operations.setPending(suite, [
            { fixture: '1', title: '1' },
            { fixture: '1.2', title: '12' },
            { fixture: '1.3', title: '21' },
        ]);

        expect(suite.fixtures()[0].tests()[0].pending()).to.be.true;
        expect(suite.fixtures()[0].fixtures()[0].tests()[0].pending()).to.not.be.true;
        expect(suite.fixtures()[0].fixtures()[0].tests()[1].pending()).to.be.true;
        expect(suite.fixtures()[0].fixtures()[1].tests()[0].pending()).to.be.true;
        expect(suite.fixtures()[0].fixtures()[1].tests()[1].pending()).to.not.be.true;
    });

    function createTest() {
        return {
            stale: ko.observable(true),
            results: ko.observableArray(),
            pending: ko.observable()
        };
    }

    function createSuite() {
        return {
            fixtures: ko.observableArray([{
                title: '1',
                tests: ko.observableArray([{ title: '1', pending: ko.observable() }]),
                fixtures: ko.observableArray([{
                    title: '2',
                    tests: ko.observableArray([{ title: '11', pending: ko.observable() }, { title: '12', pending: ko.observable() }]),
                    fixtures: ko.observableArray()
                }, {
                    title: '3',
                    tests: ko.observableArray([{ title: '21', pending: ko.observable() }, { title: '22', pending: ko.observable() }]),
                    fixtures: ko.observableArray()
                }])
            }]),
            tests: ko.observableArray()
        };

    }
});
