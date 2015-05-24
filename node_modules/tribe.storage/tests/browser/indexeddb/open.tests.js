suite('tribe.storage.indexeddb.open', function () {
    var provider = require('tribe.storage/indexeddb'),
        open = require('tribe.storage/indexeddb/db/open');

    test("open creates entities and indexes", function () {
        var entities = [
            { name: 'test' },
            { name: 'test2', indexes: ['value'] },
        ];

        return provider.open({ reset: true }, entities)
            .then(function () {
                provider.close();
                return open.db('__entities', 1);
            })
            .then(function (database) {
                expect(database.objectStoreNames[0]).to.equal('test');
                expect(database.objectStoreNames[1]).to.equal('test2');

                var transaction = database.transaction(['test', 'test2']);
                expect(transaction.objectStore('test').indexNames.length).to.equal(0);
                expect(transaction.objectStore('test2').indexNames[0]).to.equal('value');

                database.close();
            });
    });

    test("open updates indexes", function () {
        return provider.open({ reset: true }, [{ name: 'test', indexes: ['value'] }])
            .then(function () {
                provider.close();
                return provider.open({ }, [{ name: 'test', indexes: ['value', 'value2'] }])
            })
            .then(function () {
                provider.close();
                return open.db('__entities', 2);
            })
            .then(function (database) {
                var transaction = database.transaction(['test']);
                expect(transaction.objectStore('test').indexNames[0]).to.equal('value');
                expect(transaction.objectStore('test').indexNames[1]).to.equal('value2');

                database.close();
            });
    });
});
