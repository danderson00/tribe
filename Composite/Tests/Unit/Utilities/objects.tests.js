﻿(function() {
    var utils = T.Utils;
    module('Unit.Utilities.objects');

    test("arguments.byConstructor", function() {
        var argsToPass = ["", {}, function() {
        }, [], 2.2];

        (function() {
            var args = utils.arguments(arguments);
            equal(args.string, argsToPass[0]);
            equal(args.object, argsToPass[1]);
            equal(args.func, argsToPass[2]);
            equal(args.array, argsToPass[3]);
            equal(args.number, argsToPass[4]);

        }).apply(null, argsToPass);
    });

    test("removeItem removes matching item from array", function() {
        var array = [1, 2, 3];
        utils.removeItem(array, 2);
        deepEqual(array, [1, 3]);
    });

    test("removeItem does not affect array if item does not exist", function() {
        var array = [1, 2, 3];
        utils.removeItem(array, 4);
        deepEqual(array, [1, 2, 3]);
    });

    test("inheritOptions", function() {
        var source = { test1: 'test', test2: 2 };
        equal(T.Utils.inheritOptions(source, {}, ['test1']).test1, 'test');
        equal(T.Utils.inheritOptions(source, {}, ['test2']).test2, 2);
        equal(T.Utils.inheritOptions(source, {}, ['test1', 'test2', 'test3']).test3, undefined);
    });
    
    test("cloneData", function () {
        var object = {};
        var result = utils.cloneData({
            func: function () { },
            string: 'string',
            object: object,
            observable: ko.observable('test'),
            except1: 'except1',
            except2: 'except2'
        }, 'except1', 'except2');

        equal(result.func, undefined);
        equal(result.string, 'string');
        equal(result.object, object);
        equal(result.observable, 'test');
        equal(result.except1, undefined);
        equal(result.except2, undefined);
    });

    test("cloneData handles value objects", function () {
        equal(utils.cloneData('test'), 'test');
        equal(utils.cloneData(1), 1);
    });
    
    test("normaliseBindings evaluates function passed as value", function () {
        equal(utils.normaliseBindings(value, function () { return {}; }).value, 'test');

        function value() {
            return function () {
                return 'test';
            };
        }
    });
})();