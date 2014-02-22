module('Unit.LoadStrategies.preloaded');

test("returns rejected promise if no resources have been loaded for the specified path", function() {
    var context = Test.Unit.context();
    var promise = T.LoadStrategies.preloaded({ path: 'test2' }, context);
    equal(promise.state(), 'rejected');
});