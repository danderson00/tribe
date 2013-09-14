(function () {
    module('Utils');

    var utils = TF.Utils;

    test("normaliseBindings evaluates function passed as value", function () {
        equal(utils.normaliseBindings(value, function () { return {}; }).value, 'test');

        function value() {
            return function () {
                return 'test';
            };
        }
    });

    test("evaluateProperty", function () {
        var target = {
            test1: {
                test11: 'test',
                test12: {
                    test121: 'test'
                }
            },
            test2: 'test'
        };

        equal(utils.evaluateProperty(target, 'test3'), undefined);
        equal(utils.evaluateProperty(target, 'test3.test4'), undefined);
        equal(utils.evaluateProperty(target, 'test1.test4'), undefined);
        equal(utils.evaluateProperty(target, ''), target);
        equal(utils.evaluateProperty(target, 'test1'), target.test1);
        equal(utils.evaluateProperty(target, 'test2'), 'test');
        equal(utils.evaluateProperty(target, 'test1.test11'), 'test');
        equal(utils.evaluateProperty(target, 'test1.test12.test121'), 'test');
        equal(utils.evaluateProperty(target, '.test1'), target.test1);
        equal(utils.evaluateProperty(target, 'test1.'), target.test1);
        equal(utils.evaluateProperty(target, 'test1..test11'), 'test');

        var container = {};
        equal(utils.evaluateProperty(target, 'test3', container), container);
        equal(target.test3, container);
        utils.evaluateProperty(target, 'test3.test4', 'test');
        equal(target.test3.test4, 'test');

        utils.evaluateProperty(target, 'test4.test5.test6', 'test');
        equal(target.test4.test5.test6, 'test');
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
})();
