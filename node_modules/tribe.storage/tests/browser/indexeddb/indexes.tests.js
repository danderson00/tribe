suite('tribe.storage.indexeddb.indexes', function () {
    var indexes = require('tribe.storage/indexeddb/indexes'),
        simple = { p: 'test.test', v: 'value' },
        multiple = [{ p: 'test', v: 1 }, { p: 'test.test', v: 2 }],
        operator = { p: 'test.test', o: '<', v: 3 };

    test("indexName", function () {
        expect(indexes.indexName(simple)).to.equal('test.test');
        expect(indexes.indexName(multiple)).to.equal('test_test.test');
    });

    test("convertExpression", function () {
        expect(indexes.convertExpression(simple)).to.deep.equal(IDBKeyRange.bound('value', 'value'));
        expect(indexes.convertExpression(multiple)).to.deep.equal(IDBKeyRange.bound([1, 2], [1, 2]));
        expect(indexes.convertExpression(operator)).to.deep.equal(IDBKeyRange.bound(Number.MIN_VALUE, 2));
    });
});