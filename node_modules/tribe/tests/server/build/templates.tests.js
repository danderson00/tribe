suite('tribe.build.templates', function () {
    test("built in templates are loaded", function () {
        var templates = require('tribe/build/templates');
        expect(templates('app')).to.not.be.undefined;
    });
});