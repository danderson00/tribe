suite('tribe.storage.utilities.metadata', function () {
    var metadata = require('tribe.storage/utilities/metadata');

    test("indexesHaveChanged arrays must match exactly", function () {
        expect(metadata.indexesHaveChanged(['p1', 'p2'], ['p1', 'p3'])).to.be.true;
        expect(metadata.indexesHaveChanged(['p1', 'p2'], ['p1'])).to.be.true;
        expect(metadata.indexesHaveChanged(['p1', 'p2', ['p1', 'p2']], ['p1', 'p2', ['p1', 'p3']])).to.be.true;
        expect(metadata.indexesHaveChanged(['p1', 'p2', ['p1', 'p2']], ['p1', 'p2', ['p1', 'p2']])).to.be.false;
    });

    test("entitiesHaveChanged compares indexes for all new indexes", function () {
        expect(metadata.entitiesHaveChanged([
            { name: 'a', indexes: ['p1', 'p2'] },
            { name: 'b', indexes: ['p1', 'p2'] }
        ], [
            { name: 'a', indexes: ['p1', 'p2'] },
            { name: 'b', indexes: ['p1', 'p2', 'p3'] }
        ])).to.be.true;

        expect(metadata.entitiesHaveChanged([
            { name: 'a', indexes: ['p1', 'p2'] },
            { name: 'b', indexes: ['p1', 'p2'] }
        ], [
            { name: 'a', indexes: ['p1', 'p2'] },
            { name: 'b', indexes: ['p1', 'p2'] }
        ])).to.be.false;
    });
});
