suite('tribe.client.enhancedDebug', function () {
    var debug = require('tribe/client/enhancedDebug');

    test("argumentNames", function () {
        expect(debug.argumentNames((function () { }))).to.deep.equal([]);
        expect(debug.argumentNames((function (one) { }))).to.deep.equal(['one']);
        expect(debug.argumentNames((function (one,two) { }))).to.deep.equal(['one', 'two']);
        expect(debug.argumentNames((function (one,two,three) { }))).to.deep.equal(['one', 'two', 'three']);
    });

    test("attachCalleeArguments", function () {
        var args = { initial: 'initial' };
        (function (one,two,three) { debug.attachCalleeArguments(arguments, args) })(1, 2, 3);
        expect(args.initial).to.equal('initial');
        expect(args.one).to.equal(1);
        expect(args.two).to.equal(2);
        expect(args.three).to.equal(3);
    });

    test("execute", function () {
        var thisArg = {},
            result = (function (one, two) { return debug.execute('return [arguments, this]', arguments, thisArg, 'require', 'module', 'exports') })(1, 2);
        expect(result[0].length).to.equal(5);
        expect(result[0][0]).to.equal('require');
        expect(result[0][1]).to.equal('module');
        expect(result[0][2]).to.equal('exports');
        expect(result[0][3]).to.equal(1);
        expect(result[0][4]).to.equal(2);
        expect(result[1]).to.equal(thisArg);
    });
});