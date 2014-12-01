suite('tribe.storage.indexeddb.metadata', function () {
    var metadata = require('tribe.storage/indexeddb/metadata');

    test("metadata can be retrieved once set", function () {
        return metadata(1, { value: 'test' })
            .then(function (data) {
                expect(data).to.deep.equal({ name: '__entities', version: 1, entities: { value: 'test' } });
            })
            .then(metadata).then(function (data) {
                expect(data).to.deep.equal({ name: '__entities', version: 1, entities: { value: 'test' } });
                metadata.close();
            });
    });
});