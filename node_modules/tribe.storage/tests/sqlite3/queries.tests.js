suite('tribe.storage.sqlite3.queries', function () {
    var queries = require('tribe.storage/sqlite3/queries');

    test("store simple envelope with no indexes", function () {
        var envelope = { id: 1, topic: 'test' },
            query = queries.store('messages', [], envelope);
        expect(query.sql).to.equal("insert into messages (__content) values (?)");
        expect(query.parameters).to.deep.equal([JSON.stringify(envelope)]);
    });

    test("store envelope with indexes", function () {
        var envelope = { id: 1, topic: 'test', value1: 1, value2: 2 },
            query = queries.store('messages', ['value1', 'value2'], envelope);
        expect(query.sql).to.equal("insert into messages (__content,value1,value2) values (?,?,?)");
        expect(query.parameters).to.deep.equal([JSON.stringify(envelope), 1, 2]);
    });

    test("retrieve with index", function () {
        var query = queries.retrieve('messages', { p: 'testId', v: 1 });
        expect(query.sql).to.equal('SELECT * FROM messages WHERE testId = ?');
        expect(query.parameters).to.deep.equal([1]);
    });

    test("retrieve with array indexValue", function () {
        var query = queries.retrieve('messages', { p: 'testId', v: [1, 2] });
        expect(query.sql).to.equal('SELECT * FROM messages WHERE testId IN (?,?)');
        expect(query.parameters).to.deep.equal([1, 2]);
    });

    test("retrieve with multiple indexes", function () {
        var query = queries.retrieve('messages', [{ p: 'testId', v: 1 }, { p: 'id', o: '>=', v: 10 }]);
        expect(query.sql).to.equal('SELECT * FROM messages WHERE testId = ? AND id >= ?');
        expect(query.parameters).to.deep.equal([1, 10]);
    });
});