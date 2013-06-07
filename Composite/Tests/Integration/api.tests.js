(function () {
    module("Integration.api");

    test("arguments can be passed to registerModel in any order", function () {
        var path = 'path';
        var options = {};
        var constructor = function () { };

        TC.registerModel(path, options, constructor);
        equal(Test.Integration.context.models.path.options, options);
        equal(Test.Integration.context.models.path.constructor, constructor);

        TC.registerModel(options, constructor, path);
        equal(Test.Integration.context.models.path.options, options);
        equal(Test.Integration.context.models.path.constructor, constructor);
    });

    test("registerModel takes path from TC.scriptEnvironment", function () {
        var constructor = function () { };
        TC.scriptEnvironment = { resourcePath: 'test' };
        TC.registerModel(constructor);
        equal(Test.Integration.context.models.test.constructor, constructor);
    });
})();