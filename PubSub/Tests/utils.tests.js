(function () {
    module("utils");

    var utils = Tribe.PubSub.utils;
    // these tests taken from the underscore library. Licensing at http://underscorejs.org.

    test("each", function () {
        utils.each([1, 2, 3], function (num, i) {
            equal(num, i + 1, 'each iterators provide value and iteration count');
        });

        var answers = [];
        utils.each([1, 2, 3], function (num) { answers.push(num * this.multiplier); }, { multiplier: 5 });
        equal(answers.join(', '), '5, 10, 15', 'context object property accessed');

        answers = [];
        var obj = { one: 1, two: 2, three: 3 };
        obj.constructor.prototype.four = 4;
        utils.each(obj, function (value, key) { answers.push(key); });
        equal(answers.join(", "), 'one, two, three', 'iterating over objects works, and ignores the object prototype.');
        delete obj.constructor.prototype.four;

        answers = 0;
        utils.each(null, function () { ++answers; });
        equal(answers, 0, 'handles a null properly');
    });

    test('map', function () {
        var doubled = utils.map([1, 2, 3], function (num) { return num * 2; });
        equal(doubled.join(', '), '2, 4, 6', 'doubled numbers');

        var tripled = utils.map([1, 2, 3], function (num) { return num * this.multiplier; }, { multiplier: 3 });
        equal(tripled.join(', '), '3, 6, 9', 'tripled numbers with context');

        var ifnull = utils.map(null, function () { });
        ok(utils.isArray(ifnull) && ifnull.length === 0, 'handles a null properly');
    });

    test('copyProperties', function () {
        var source = { p1: '1', p2: '2', p3: '3' },
            target = { p1: '2' },
            properties = ['p1', 'p2', 'p4'];

        utils.copyProperties(source, target, properties);
        equal(target.p1, '1');
        equal(target.p2, '2');
        equal(target.p3, undefined);
        equal(target.p4, undefined);
    });
})();
