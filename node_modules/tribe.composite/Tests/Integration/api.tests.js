(function () {
    module("Integration.api", { teardown: Test.Integration.teardown });

    test("arguments can be passed to registerModel in any order", function () {
        var path = 'path';
        var options = {};
        var constructor = function () { };

        T.registerModel(path, options, constructor);
        equal(Test.Integration.context.models.path.options, options);
        equal(Test.Integration.context.models.path.constructor, constructor);

        T.registerModel(options, constructor, path);
        equal(Test.Integration.context.models.path.options, options);
        equal(Test.Integration.context.models.path.constructor, constructor);
    });

    test("registerModel takes path from T.scriptEnvironment", function () {
        var constructor = function () { };
        T.scriptEnvironment = { resourcePath: 'test' };
        T.registerModel(constructor);
        equal(Test.Integration.context.models.test.constructor, constructor);
    });

    test("registerActor takes path from T.scriptEnvironment", function () {
        var constructor = function () { };
        T.scriptEnvironment = { resourcePath: 'test' };
        T.registerActor(constructor);
        equal(Test.Integration.context.actors.test.constructor, constructor);
    });
})();