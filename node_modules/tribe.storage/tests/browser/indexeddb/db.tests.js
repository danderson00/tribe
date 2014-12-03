suite('tribe.storage.indexeddb.db', function () {
    var openDatabase = require('tribe.storage/indexeddb/db/open'),
        store, db;

    teardown(function () {
        db.close();
    });

    test("single object added passing single object", function () {
        return open().then(add).then(function () {
            return store.single(1);
        }).then(function (result) {
            expect(result).to.deep.equal({ id: 1, value: 'one' });
        });
    });

    test("single object added passing array of objects", function () {
        return open().then(add).then(function () {
            return store.single(2);
        }).then(function (result) {
            expect(result).to.deep.equal({ id: 2, value: 'two' });
        });
    });

    test("single object put passing single object", function () {
        return open().then(put).then(function () {
            return store.single(1);
        }).then(function (result) {
            expect(result).to.deep.equal({ id: 1, value: 'one' });
        });
    });

    test("single object put passing array of objects", function () {
        return open().then(put).then(function () {
            return store.single(2);
        }).then(function (result) {
            expect(result).to.deep.equal({ id: 2, value: 'two' });
        });
    });

    test("single non-existent object returns undefined", function () {
        return open().then(add).then(function () {
            return store.single(4);
        }).then(function (result) {
            expect(result).to.be.undefined;
        });
    });

    test("index", function () {
        return open().then(put).then(function () {
            return store.index('idIndex', IDBKeyRange.only(2));
        }).then(function (result) {
            expect(result).to.deep.equal([{ id: 2, value: 'two' }]);
        });
    });

    test("all objects", function () {
        return open().then(add).then(function () {
            return store.all();
        }).then(function (result) {
            expect(result).to.deep.equal([{ id: 1, value: 'one' }, { id: 2, value: 'two' }, { id: 3, value: 'three' }]);
        });
    });

    function open() {
        return openDatabase('test', 4, function (database) {
            try {
                database.deleteObjectStore('test');
            } catch (ex) { }
            var store = database.createObjectStore('test', { keyPath: 'id' });
            store.createIndex('idIndex', 'id');
        }).then(function (stores) {
            db = stores;
            store = stores.store('test');
            return store.clear();
        });
    }

    function add() {
        return store.add({ id: 1, value: 'one' })
            .then(function () {
                return store.add([{ id: 2, value: 'two' }, { id: 3, value: 'three' }]);
            });
    }

    function put() {
        return store.put({ id: 1, value: 'one' })
            .then(function () {
                return store.put([{ id: 2, value: 'two' }, { id: 3, value: 'three' }]);
            });
    }
});
