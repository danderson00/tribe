module.exports = function (options, suite, test, expect, teardown) {
    require('./integration.expressions')(options, suite, test, expect, teardown);

    suite('tribe.storage.integration.' + options.type, function () {
        var storage = require('tribe.storage'),
            db;

        test("basic store and retrieve", function () {
            return open(['p1', 'p2'],
                [
                    { p1: 1, p2: 'test' },
                    { p1: 2, p2: 'test2' }
                ])
                .then(function (container) {
                    return container.retrieve({ p: 'p1', v: 1 });
                })
                .then(function (rows) {
                    expect(rows.length).to.equal(1);
                    expect(rows[0]).to.deep.equal({ p1: 1, p2: 'test' });
                });
        });

        test("multiple key index store and retrieve", function () {
            return open([['p1', 'p2']],
                [
                    { p1: 'test', p2: 1 },
                    { p1: 'test', p2: 2 },
                    { p1: 'test', p2: 3 },
                    { p1: 'test2', p2: 2 },
                ])
                .then(function (container) {
                    return container.retrieve([{ p: 'p1', v: 'test' }, { p: 'p2', o: '>=', v: 2 }]);
                })
                .then(function (rows) {
                    expect(rows.length).to.equal(2);
                });
        });

        // this was originally done by sorting the index. this won't work with indexeddb as order is significant
        // we can store some metadata about index order and apply expression components in the correct order. todo.
        //test("multiple key order does not need to match expression order", function () {
        //    return open([['p1', 'p2']], [{ p1: 'test', p2: 1 }])
        //        .then(function (container) {
        //            return container.retrieve([{ p: 'p2', v: 1 }, { p: 'p1', v: 'test' }]);
        //        })
        //        .then(function (rows) {
        //            expect(rows.length).to.equal(1);
        //        });
        //});

        test("complex object store and retrieve", function () {
            return open([['p1.p2', 'p3']],
                [
                    { p1: { p2: 'test' }, p3: 1 },
                    { p1: { p2: 'test' }, p3: 1 },
                    { p1: { p2: 'test2' }, p3: 1 }
                ])
                .then(function (container) {
                    return container.retrieve([{ p: 'p1.p2', v: 'test' }, { p: 'p3', v: 1 }]);
                })
                .then(function (rows) {
                    expect(rows.length).to.equal(2);
                });
        });

        test("keyPath can be queried when autoIncrement is set", function () {
            return open([],
                [
                    { p2: 'test' },
                    { p2: 'test2' }
                ], 'p1', true)
                .then(function (container) {
                    return container.retrieve({ p: 'p1', v: 1 });
                })
                .then(function (rows) {
                    expect(rows.length).to.equal(1);
                    expect(rows[0]).to.deep.equal({ p1: 1, p2: 'test' });
                });
        });

        test("keyPath can be queried when autoIncrement is not set", function () {
            return open([],
                [
                    { p1: 3, p2: 'test' },
                    { p1: 4, p2: 'test2' }
                ], 'p1', false)
                .then(function (container) {
                    return container.retrieve({ p: 'p1', v: 3 });
                })
                .then(function (rows) {
                    expect(rows.length).to.equal(1);
                    expect(rows[0]).to.deep.equal({ p1: 3, p2: 'test' });
                });
        });

        test("keyPath can be queried with indexes", function () {
            return open(['p2'],
                [
                    { p1: 1, p2: 'test' },
                    { p1: 2, p2: 'test2' }
                ], 'p1')
                .then(function (container) {
                    return container.retrieve([{ p: 'p1', v: 1 }, { p: 'p2', v: 'test' }]);
                })
                .then(function (rows) {
                    expect(rows.length).to.equal(1);
                    expect(rows[0]).to.deep.equal({ p1: 1, p2: 'test' });
                });
        });

        test("store operation returns entity with autoIncrement keyPath property set", function () {
            return open([], [], 'id', true)
                .then(function (container) {
                    return container.store({});
                })
                .then(function (updatedEntity) {
                    expect(updatedEntity).to.deep.equal({ id: 1 });
                });
        });

        test("multiple store operation returns entities with autoIncrement keyPath property set", function () {
            return open([], [], 'id', true)
                .then(function (container) {
                    return container.store([{}, {}]);
                })
                .then(function (updatedEntity) {
                    expect(updatedEntity).to.deep.equal([{ id: 1 }, { id: 2 }]);
                });
        });

        test("stored entity has autoIncrement keyPath property set", function () {
            var container;
            return open([], [], 'id', true)
                .then(function (db) {
                    container = db;
                    return container.store({});
                })
                .then(function () {
                    return container.retrieve({ p: 'id', v: 1 });
                })
                .then(function (entities) {
                    expect(entities.length).to.equal(1);
                    expect(entities[0]).to.deep.equal({ id: 1 });
                });
        });

        test("store operation replaces entities with matching keys", function () {
            var entity;
            return open([], [{ p1: 1, p2: 'test' }], 'p1')
                .then(function (provider) {
                    entity = provider;
                    return entity.store({ p1: 1, p2: 'test2' });
                })
                .then(function () {
                    return entity.retrieve({ p: 'p1', v: 1 });
                })
                .then(function (entities) {
                    expect(entities.length).to.equal(1);
                    expect(entities[0].p2).to.equal('test2');
                });
        });

        test("single property indexes can be specified and requested as arrays or individually", function () {
            var container;

            return open(['p1', ['p2']], [
                    { p1: 1, p2: 1 },
                    { p1: 2, p2: 2 }
                ])
                .then(function (result) {
                    container = result;
                    return container.retrieve({ p: 'p1', v: 2 });
                })
                .then(function (results) {
                    expect(results.length).to.equal(1);
                })
                .then(function (result) {
                    return container.retrieve([{ p: 'p1', v: 2 }]);
                })
                .then(function (results) {
                    expect(results.length).to.equal(1);
                })
                .then(function (result) {
                    return container.retrieve({ p: 'p2', v: 2 });
                })
                .then(function (results) {
                    expect(results.length).to.equal(1);
                })
                .then(function (result) {
                    return container.retrieve([{ p: 'p2', v: 2 }]);
                })
                .then(function (results) {
                    expect(results.length).to.equal(1);
                });
        });

        test("retrieve sorts by index properties", function () {
            var container;

            return open([['p1', 'p2.value'], ['p2.value', 'p1']], [
                    { p1: 4, p2: { value: 1 } },
                    { p1: 3, p2: { value: 2 } },
                    { p1: 1, p2: { value: 1 } },
                    { p1: 2, p2: { value: 2 } }
                ])
                .then(function (result) {
                    container = result;
                    return container.retrieve([{ p: 'p1', o: '>', v: 0 }, { p: 'p2.value', o: '>', v: 0 }]);
                })
                .then(function (results) {
                    expect(results).to.deep.equal([
                        { p1: 1, p2: { value: 1 } },
                        { p1: 2, p2: { value: 2 } },
                        { p1: 3, p2: { value: 2 } },
                        { p1: 4, p2: { value: 1 } }
                    ]);
                    return container.retrieve([{ p: 'p2.value', o: '>', v: 0 }, { p: 'p1', o: '>', v: 0 }]);
                })
                .then(function (results) {
                    expect(results).to.deep.equal([
                        { p1: 1, p2: { value: 1 } },
                        { p1: 4, p2: { value: 1 } },
                        { p1: 2, p2: { value: 2 } },
                        { p1: 3, p2: { value: 2 } }
                    ]);
                });
        });

        test("clear deletes all entities", function () {
            var container;

            return open(['p1'], [{ p1: 1, p2: 1 }])
                .then(function (result) {
                    container = result;
                    container.clear();
                })
                .then(function () {
                    return container.retrieve({ p: 'p1', v: 1 });
                })
                .then(function (messages) {
                    expect(messages.length).to.equal(0);
                });
        });

        function open(indexes, entities, keyPath, autoIncrement) {
            var entity;

            return storage.open([{ name: 'test', indexes: indexes, keyPath: keyPath, autoIncrement: autoIncrement }], options)
                .then(function (provider) {
                    db = provider;
                    entity = provider.entity('test');
                    return entity.store(entities);
                })
                .then(function () {
                    return entity;
                });
        }

        teardown(function () {
            db.close();
        });
    });

};
