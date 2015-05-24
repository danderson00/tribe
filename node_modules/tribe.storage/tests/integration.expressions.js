module.exports = function (options, suite, test, expect, teardown) {
    suite('tribe.storage.integration.expressions.' + options.type , function () {
        var storage = require('tribe.storage'),
            db;

        test("equality", function () {
            return retrieve({ p: 'p1', o: '=', v: 1 }, [1]);
            return retrieve([{ p: 'p1', o: '=', v: 1 }, { p: 'p2', o: '=', v: 1 }, { p: 'p3', o: '=', v: 'test' }], [1]);
            return retrieve([{ p: 'p1', o: '=', v: 1 }, { p: 'p2', o: '=', v: 2 }, { p: 'p3', o: '=', v: 'test' }], []);
        });

        test("greaterThan", function () {
            return retrieve({ p: 'p1', o: '>', v: 2 }, [3, 4]);
            return retrieve([{ p: 'p1', o: '>', v: 1 }, { p: 'p2', o: '>', v: 2 }, { p: 'p3', o: '=', v: 'test' }], [4]);
            return retrieve([{ p: 'p1', o: '>', v: 1 }, { p: 'p2', o: '>', v: 4 }, { p: 'p3', o: '=', v: 'test' }], []);
        });

        test("greaterThanEqualTo", function () {
            return retrieve({ p: 'p1', o: '>=', v: 2 }, [2, 3, 4]);
            return retrieve([{ p: 'p1', o: '>=', v: 2 }, { p: 'p2', o: '>=', v: 1 }, { p: 'p3', o: '=', v: 'test' }], [2, 4]);
            return retrieve([{ p: 'p1', o: '>=', v: 1 }, { p: 'p2', o: '>=', v: 4 }, { p: 'p3', o: '=', v: 'test' }], [4]);
        });

        test("lessThan", function () {
            return retrieve({ p: 'p1', o: '<', v: 3 }, [1, 2]);
            return retrieve([{ p: 'p1', o: '<', v: 4 }, { p: 'p2', o: '<', v: 3 }, { p: 'p3', o: '=', v: 'test' }], [1, 2]);
            return retrieve([{ p: 'p1', o: '<', v: 4 }, { p: 'p2', o: '<', v: 1 }, { p: 'p3', o: '=', v: 'test' }], []);
        });

        test("lessThanEqualTo", function () {
            return retrieve({ p: 'p1', o: '<=', v: 3 }, [1, 2, 3]);
            return retrieve([{ p: 'p1', o: '<=', v: 4 }, { p: 'p2', o: '<=', v: 3 }, { p: 'p3', o: '=', v: 'test' }], [1, 2]);
            return retrieve([{ p: 'p1', o: '<=', v: 4 }, { p: 'p2', o: '<=', v: 1 }, { p: 'p3', o: '=', v: 'test' }], [1]);
        });

        function retrieve(expression, resultIds) {
            var entity;

            return storage.open([{ name: 'test', indexes: ['p1', ['p1', 'p2', 'p3']] }], options)
                .then(function (provider) {
                    db = provider;
                    entity = provider.entity('test');
                    return entity.store([
                        { p1: 1, p2: 1, p3: 'test' },
                        { p1: 2, p2: 2, p3: 'test' },
                        { p1: 3, p2: 3, p3: 'test2' },
                        { p1: 4, p2: 4, p3: 'test' },
                    ]);
                })
                .then(function () {
                    return entity.retrieve(expression);
                })
                .then(function (results) {
                    expect(results.length).to.equal(resultIds.length);
                    for (var i = 0, l = resultIds.length; i < l; i++)
                        expect(results[i].p1).to.equal(resultIds[i]);
                });
        }

        teardown(function () {
            db.close();
        });
    });

};
