suite('tribe.pubsub.filters.expression', function () {
    var filter = require('../filters/expression');

    test("get returns empty array when no handlers have been registered", function () {
        var list = new filter();
        expect(list.get({ data: {} }).length).to.equal(0);
    });

    test("get returns handlers where specified expression matches", function () {
        var list = new filter();
        list.add(1, 1, { p: 'data.test', v: 1 });
        list.add(2, 2, { p: 'data.test', v: 1 });
        list.add(3, 3, { p: 'data.test', v: 2 });
        list.add(4, 4, { p: 'data.test2', v: 1 });

        expect(list.get({ data: { test: 1 } })).to.deep.equal([1, 2]);
        expect(list.get({ data: { test: 2 } })).to.deep.equal([3]);
        expect(list.get({ data: { test2: 1 } })).to.deep.equal([4]);
        expect(list.get({ data: { test: 1, test2: 1 } })).to.deep.equal([1, 2, 4]);
    });

    test("multiple expressions can be specified", function () {
        var list = new filter();
        list.add(1, 1, { p: 'data.test', v: 1 });
        list.add(2, 2, [{ p: 'data.test', v: 1 }, { p: 'data.test2', v: 1 }]);
        list.add(3, 3, [{ p: 'data.test', v: 2 }, { p: 'data.test2', v: 2 }]);

        expect(list.get({ data: { test: 1 } })).to.deep.equal([1]);
        expect(list.get({ data: { test: 1, test2: 1 } })).to.deep.equal([1, 2]);
        expect(list.get({ data: { test: 2, test2: 2 } })).to.deep.equal([3]);
        expect(list.get({ data: { test: 2, test2: 1 } })).to.deep.equal([]);
    });

    test("get does not return removed handlers", function () {
        var list = new filter();

        list.add(1, 1, { p: 'data.test', v: 1 });
        list.add(2, 2, { p: 'data.test', v: 1 });
        expect(list.get({ data: { test: 1 } })).to.deep.equal([1, 2]);

        list.remove(1);
        list.remove(3);
        expect(list.get({ data: { test: 1 } })).to.deep.equal([2]);

        list.remove(2);
        expect(list.get({ data: { test: 1 } })).to.deep.equal([]);
    });

    test("multiple expressions are removed correctly", function () {
        var list = new filter();

        list.add(1, 1, { p: 'data.test', v: 1 });
        list.add(2, 2, [{ p: 'data.test', v: 1 }, { p: 'data.test2', v: 1 }]);
        list.add(3, 3, [{ p: 'data.test', v: 1 }, { p: 'data.test2', v: 2 }]);
        list.add(4, 4, [{ p: 'data.test', v: 1 }, { p: 'data.test2', v: 1 }]);
        list.add(5, 5, [{ p: 'data.test', v: 1 }, { p: 'data.test2', v: 1 }, { p: 'data.test3', v: 1 }]);
        expect(list.get({ data: { test: 1, test2: 1 } })).to.deep.equal([1, 2, 4]);
        expect(list.get({ data: { test: 1, test2: 2 } })).to.deep.equal([1, 3]);

        list.remove(1);
        expect(list.get({ data: { test: 1, test2: 1 } })).to.deep.equal([2, 4]);
        expect(list.get({ data: { test: 1, test2: 2 } })).to.deep.equal([3]);

        list.remove(2);
        expect(list.get({ data: { test: 1, test2: 1 } })).to.deep.equal([4]);
        expect(list.get({ data: { test: 1, test2: 2 } })).to.deep.equal([3]);

        list.remove(3);
        list.remove(4);
        expect(list.get({ data: { test: 1, test2: 1 } })).to.deep.equal([]);
        expect(list.get({ data: { test: 1, test2: 2 } })).to.deep.equal([]);
        expect(list.get({ data: { test: 1, test2: 1, test3: 1 } })).to.deep.equal([5]);
    });

    test("specifying a single expression in an array", function () {
        var list = new filter();
        list.add(1, 1, [{ p: 'data.test', v: 1 }]);
        expect(list.get({ data: { test: 1 } })).to.deep.equal([1]);
    });
});