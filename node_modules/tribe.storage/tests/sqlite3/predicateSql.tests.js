suite('tribe.storage.sqlite3.predicateSql', function () {
    var predicates = require('tribe.storage/sqlite3/predicateSql');

    test("toSql generates query for single predicate", function () {
        var query = predicates.toSql({ o: '=', p: 'p1.p2', v: 'te"st' });
        expect(query.sql).to.equal(' WHERE p1_p2 = ? ORDER BY p1_p2');
        expect(query.parameters).to.deep.equal(['te"st']);
    });

    test("toSql defaults to equal operator", function () {
        var query = predicates.toSql({ p: 'p1.p2', v: 'te"st' });
        expect(query.sql).to.equal(' WHERE p1_p2 = ? ORDER BY p1_p2');
        expect(query.parameters).to.deep.equal(['te"st']);
    });

    test("toSql converts = to IN if value is array", function () {
        var query = predicates.toSql({ p: 'p1.p2', v: [1, 2] });
        expect(query.sql).to.equal(' WHERE p1_p2 IN (?,?) ORDER BY p1_p2');
        expect(query.parameters).to.deep.equal([1, 2]);
    });

    test("toSql generates query for multiple predicates", function () {
        var query = predicates.toSql([
            { o: '=', p: 'p1.p2', v: 'test' },
            { o: '>', p: 'p3.p4', v: 10 }
        ]);
        expect(query.sql).to.equal(' WHERE p1_p2 = ? AND p3_p4 > ? ORDER BY p1_p2,p3_p4');
        expect(query.parameters).to.deep.equal(['test', 10]);
    });

    test("toSql generates list for array predicates", function () {
        var query = predicates.toSql({ o: 'in', p: 'p1.p2', v: ['v1', 'v2', 'v3'] });
        expect(query.sql).to.equal(' WHERE p1_p2 IN (?,?,?) ORDER BY p1_p2');
        expect(query.parameters).to.deep.equal(['v1', 'v2', 'v3']);
    });

    test("toSql generates is null for undefined values", function () {
        var query = predicates.toSql([
            { o: '=', p: 'p1.p2' },
            { o: 'in', p: 'p3.p4', v: ['v1', null] }
        ]);
        expect(query.sql).to.equal(' WHERE p1_p2 IS ? AND p3_p4 IN (?,?) ORDER BY p1_p2,p3_p4');
        expect(query.parameters).to.deep.equal([undefined, 'v1', null]);
    });
});
