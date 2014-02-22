module('Integration.Sagas', {
    setup: Test.Integration.createTestElement,
    teardown: Test.Integration.teardown
});

test("sagas can be registered by name", function () {
    var func = function () { };
    T.registerSaga('test1', func);

    equal(Test.Integration.context.sagas.test1.constructor, func);
});

test("sagas can be registered using scriptEnvironment", function () {
    var func = function () { };
    T.scriptEnvironment = { resourcePath: 'test2' };
    T.registerSaga(func);
    delete T.scriptEnvironment;
    
    equal(Test.Integration.context.sagas.test2.constructor, func);
});