module('Unit.Utilities.collections');

test("each executes iterator for each item of array, passing value and index", function () {
    var spy = sinon.spy();
    TC.Utils.each(['1', '2'], spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 0);
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 1);
});

test("each executes iterator for each property of object, passing value and property name", function () {
    var spy = sinon.spy();
    TC.Utils.each({ test1: '1', test2: '2' }, spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 'test1');
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 'test2');
});

test("map executes iterator for each item of array, passing value and index", function () {
    var spy = sinon.spy();
    TC.Utils.map(['1', '2'], spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 0);
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 1);
});

test("map executes iterator for each property of object, passing value and property name", function () {
    var spy = sinon.spy();
    TC.Utils.map({ test1: '1', test2: '2' }, spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 'test1');
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 'test2');
});

test("map does not flatten arrays", function() {
    var result = TC.Utils.map([1, 2], function () { return [3, 4]; });
    equal(result.length, 2);
    deepEqual(result[0], [3, 4]);
    deepEqual(result[1], [3, 4]);
});

test("map returns empty array for undefined input", function() {
    var spy = sinon.spy();
    deepEqual(TC.Utils.map(undefined, spy), []);
    ok(spy.notCalled);
});

test("filter executes once for each item of array", function() {
    var spy = sinon.spy();
    TC.Utils.filter(['1', '2'], spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 0);
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 1);
});

test("filter executes once for each property of object", function () {
    var spy = sinon.spy();
    TC.Utils.filter({ test1: '1', test2: '2' }, spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 'test1');
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 'test2');
});

test("filter returns array of values filtered by iterator function", function() {
    var result = TC.Utils.filter(['1', '2'], function (item) { return item !== '1'; });
    equal(result.length, 1);
    equal(result[0], '2');
});

test("filter returns empty array for undefined input", function () {
    var spy = sinon.spy();
    deepEqual(TC.Utils.filter(undefined, spy), []);
    ok(spy.notCalled);
});

test("pluck returns property value from each object in array", function() {
    var result = TC.Utils.pluck([
        { one: 'a', two: 'b' },
        { one: 'c', two: 'd' },
        { one: 'e', two: 'f' }
    ], 'one');
    equal(result.length, 3);
    equal(result.join(''), 'ace');
});

test("reduce executes reduceFunction with expected arguments", function() {
    var spy = sinon.spy();
    var list = [1, 2];
    TC.Utils.reduce(list, 'initial', spy);

    equal(spy.callCount, 2);
    deepEqual(spy.firstCall.args, ['initial', 1, 0, list]);
    deepEqual(spy.secondCall.args, [undefined, 2, 1, list]);
});

test("reduce returns expected result", function() {
    var result = TC.Utils.reduce([1, 2, 3, 4], 10, function(memo, value) {
        return memo + value;
    });
    equal(result, 20);
});