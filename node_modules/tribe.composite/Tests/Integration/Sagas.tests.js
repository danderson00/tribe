module('Integration.Actors', {
    setup: Test.Integration.createTestElement,
    teardown: Test.Integration.teardown
});

test("actors can be registered by name", function () {
    var func = function () { };
    T.registerActor('test1', func);

    equal(Test.Integration.context.actors.test1.constructor, func);
});

test("actors can be registered using scriptEnvironment", function () {
    var func = function () { };
    T.scriptEnvironment = { resourcePath: 'test2' };
    T.registerActor(func);
    delete T.scriptEnvironment;
    
    equal(Test.Integration.context.actors.test2.constructor, func);
});