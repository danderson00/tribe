suite('tribe.storage.sqlite3.queries', function () {
    var queries = require('tribe.storage/sqlite3/queries');

    test("store with no indexes or keyPath", function () {
        var envelope = { id: 1, topic: 'test' },
            query = queries.store({ name: 'messages', indexes: [] }, envelope);
        expect(query.sql).to.equal("insert or replace into messages (__content) values (?)");
        expect(query.parameters).to.deep.equal([JSON.stringify(envelope)]);
    });

    test("store with indexes but no keyPath", function () {
        var envelope = { id: 1, topic: 'test', value1: 1, value2: 2 },
            query = queries.store({ name: 'messages', indexes: ['value1', 'value2'] }, envelope);
        expect(query.sql).to.equal("insert or replace into messages (__content,value1,value2) values (?,?,?)");
        expect(query.parameters).to.deep.equal([JSON.stringify(envelope), 1, 2]);
    });

    test("store with keyPath specified but not set", function () {
        var envelope = { topic: 'test' },
            query = queries.store({ name: 'messages', indexes: [], keyPath: 'id' }, envelope);
        expect(query.sql).to.equal("insert or replace into messages (__content,id) values (?,?)");
        expect(query.parameters).to.deep.equal([JSON.stringify(envelope), undefined]);
    });

    test("store with keyPath set", function () {
        var envelope = { id: 1, topic: 'test' },
            query = queries.store({ name: 'messages', indexes: [], keyPath: 'id' }, envelope);
        expect(query.sql).to.equal("insert or replace into messages (__content,id) values (?,?)");
        expect(query.parameters).to.deep.equal([JSON.stringify(envelope), 1]);
    });

    test("retrieve with index", function () {
        var query = queries.retrieve('messages', { p: 'testId', v: 1 });
        expect(query.sql).to.equal('SELECT * FROM messages WHERE testId = ? ORDER BY testId');
        expect(query.parameters).to.deep.equal([1]);
    });

    test("retrieve with array indexValue", function () {
        var query = queries.retrieve('messages', { p: 'testId', v: [1, 2] });
        expect(query.sql).to.equal('SELECT * FROM messages WHERE testId IN (?,?) ORDER BY testId');
        expect(query.parameters).to.deep.equal([1, 2]);
    });

    test("retrieve with multiple indexes", function () {
        var query = queries.retrieve('messages', [{ p: 'testId', v: 1 }, { p: 'id', o: '>=', v: 10 }]);
        expect(query.sql).to.equal('SELECT * FROM messages WHERE testId = ? AND id >= ? ORDER BY testId,id');
        expect(query.parameters).to.deep.equal([1, 10]);
    });
});


/*
update messages set __content = ? where id = ?;insert or ignore into messages (__content,id) values (?,?)
update messages set __content = ? where id = ?;insert or ignore into messages (__content,id) values (?,?)

*/
