suite('tribe.utilities.browserify', function () {
    var browserify = require('tribe/utilities/browserify'),
        d = browserify.dependencies([
            { id: '/a', deps: { 'c': '/c', 'd': '/d' }, entry: true },
            { id: '/b', deps: { 'c': '/c' }, entry: true },
            { id: '/c', deps: { 'd': '/d', 'e': '/e' }, entry: false },
            { id: '/d', deps: { 'e': '/e' }, entry: false },
            { id: '/e', deps: {}, entry: false },
        ]),
        trees = d.trees,
        files = d.files;

    test("dependencies constructs trees correctly", function () {
        expect(trees.length).to.equal(2);

        expect(trees[0].id).to.equal('/a');
        expect(trees[0].deps.c.id).to.equal('/c');
        expect(trees[0].deps.c.deps.d.id).to.equal('/d');
        expect(trees[0].deps.c.deps.d.deps.e.id).to.equal('/e');
        expect(trees[0].deps.c.deps.e.id).to.equal('/e');
        expect(trees[0].deps.d.id).to.equal('/d');
        expect(trees[0].deps.d.deps.e.id).to.equal('/e');

        expect(trees[1].id).to.equal('/b');
        expect(trees[1].deps.c.id).to.equal('/c');
        expect(trees[1].deps.c.deps.d.id).to.equal('/d');
        expect(trees[1].deps.c.deps.d.deps.e.id).to.equal('/e');
        expect(trees[1].deps.c.deps.e.id).to.equal('/e');
    });

    test("dependencies handles circular dependencies", function () {
        var tree = browserify.dependencies([
            { id: 'a', deps: { 'b': 'b' }, entry: true },
            { id: 'b', deps: { 'a': 'a' } }
        ]).trees[0];

        expect(tree.id).to.equal('a');
        expect(tree.deps.b.id).to.equal('b');
        expect(tree.deps.b.deps.a.id).to.equal('a');
        expect(tree.deps.b.deps.a.deps.circular).to.deep.equal({});
    });

    test("dependencies constructs array of files", function () {
        expect(files.length).to.equal(5);
        expect(files).to.contain('/a');
        expect(files).to.contain('/b');
        expect(files).to.contain('/c');
        expect(files).to.contain('/d');
        expect(files).to.contain('/e');
    });

    test("toDisplayTree maps to format archy expects", function () {
        var display = browserify.toDisplayTree(trees);

        expect(display.label).to.equal('Dependencies');
        expect(display.nodes.length).to.equal(2);

        expect(display.nodes[0].label).to.equal('/a');
        expect(display.nodes[0].nodes.length).to.equal(2);
        expect(display.nodes[0].nodes[0].label).to.equal('c');
        expect(display.nodes[0].nodes[0].nodes.length).to.equal(2);
        expect(display.nodes[0].nodes[0].nodes[0].label).to.equal('d');
        expect(display.nodes[0].nodes[0].nodes[0].nodes.length).to.equal(1);
        expect(display.nodes[0].nodes[0].nodes[0].nodes[0].label).to.equal('e');
        expect(display.nodes[0].nodes[0].nodes[0].nodes[0].nodes.length).to.equal(0);
        expect(display.nodes[0].nodes[1].label).to.equal('d');
        expect(display.nodes[0].nodes[1].nodes.length).to.equal(1);
        expect(display.nodes[0].nodes[1].nodes[0].label).to.equal('e');
        expect(display.nodes[0].nodes[1].nodes[0].nodes.length).to.equal(0);

        expect(display.nodes[1].label).to.equal('/b');
    });
});