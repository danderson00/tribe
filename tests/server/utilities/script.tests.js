var script = require('tribe/utilities/script');

suite('tribe.utilities.script', function () {
    test("context properties are available as pseudo-globals", function () {
        var context = {
            test: { value: 1 }
        };
        script.evalInContext("test.value = 2", context);
        expect(context.test.value).to.equal(2);
    });

    test("context properties shadow globals", function () {
        var context = {
            window: { value: 1 }
        };
        script.evalInContext("window.value = 2", context);
        expect(context.window.value).to.equal(2);
    });

    test("toString embeds script in string", function () {
        expect(script.toString('var x = "test";\n')).to.equal('"var x = \\"test\\";\\n"');
    });
});