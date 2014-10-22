suite('tribe.storage.sqlite3.initialise', function () {
    var initialise = require('tribe.storage/sqlite3/initialise'),
        database = require('tribe.storage/sqlite3/database');

    setup(function () {
        database.open(':memory:');
    });

    teardown(database.close);

    test("initialise creates table with entity name", function () {
        return initialise('messages', [], database)
            .then(function () {
                return database.get("select * from messages");
            });
    });

    // should probably test for creation of actual indexes
    test("initialise with index creates column", function () {
        return initialise('messages', ['testId'], database)
            .then(function () {
                return database.get("select * from messages where testId = 1");
            });
    });

    test("initialise with keyPath index creates column", function () {
        return initialise('messages', ['test.id'], database)
            .then(function () {
                return database.get("select * from messages where test_id = 1");
            });
    });

    test("initialise with multiple keyPath index creates columns", function () {
        return initialise('messages', [['test.id', 'test2']], database)
            .then(function () {
                return database.get("select * from messages where test_id = 1 and test2 = 2");
            });
    });

    test("initialise with new indexes creates new columns", function () {
        return initialise('messages', ['testId'], database)
            .then(function () {
                return initialise('messages', ['test2Id'], database);
            })
            .then(function () {
                return database.get("select * from messages where testId = 1 and test2Id = 1");
            });
    });
});
