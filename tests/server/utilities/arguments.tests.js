suite('tribe.utilities.arguments', function () {
    test("byConstructor", function () {
        var utils = require('tribe/utilities/arguments'),
            argsToPass = ["", {}, function () { }, [], 2.2];

        (function () {
            var args = utils(arguments);
            expect(args.string).to.equal(argsToPass[0]);
            expect(args.object).to.equal(argsToPass[1]);
            expect(args.func).to.equal(argsToPass[2]);
            expect(args.array).to.equal(argsToPass[3]);
            expect(args.number).to.equal(argsToPass[4]);

        }).apply(null, argsToPass);
    });
});
