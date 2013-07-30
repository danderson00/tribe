(function () {
    module('Unit.Utilities.querystring');
    
    var querystring = TC.Utils.Querystring;

    test("stringify handles flat objects", function() {
        equal(querystring.stringify({ test: 't', test2: 2 }), 'test=t&test2=2');
    });
    
    test("stringify handles nested objects", function () {
        equal(decodeURI(querystring.stringify({ test: { test2: 't' } })), 'test[test2]=t');
        equal(decodeURI(querystring.stringify({ test: { test2: { test3: 't' } } })), 'test[test2][test3]=t');
    });

    test("stringify handles arrays", function () {
        equal(decodeURI(querystring.stringify({ test: { test2: [{ test3: 't' }] } })), 'test[test2][][test3]=t');
    });

    test("stringify handles arrays with arrayKey set to false", function () {
        equal(
            decodeURI(querystring.stringify({ test: { test2: [{ test3: 't' }] } }, { arrayKey: false })),
            'test[test2][test3]=t');
    });

    test("stringify raises if source contains cyclic references", function () {
        raises(function () {
            var test1 = {};
            var test2 = { test1: test1 };
            test1.test2 = test2;
            querystring.stringify(test1);
        });
    });

    test("parse handles flat objects", function () {
        deepEqual(querystring.parse('test=t&test2=2'), { test: 't', test2: 2 });
    });

    test("parse strips leading question mark", function () {
        deepEqual(querystring.parse('?test=t&test2=2'), { test: 't', test2: 2 });
    });

    test("parse handles nested objects", function () {
        deepEqual(querystring.parse('test[test2]=t'), { test: { test2: 't' } });
        deepEqual(querystring.parse('test[test2][test3]=t'), { test: { test2: { test3: 't' } } });
    });

    test("parse handles arrays", function () {
        deepEqual(querystring.parse('test[test2][][test3]=t'), { test: { test2: [{ test3: 't' }] } });
    });
})();
