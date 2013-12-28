
// Tests/logger.tests.js

//(function() {
//    var logger;

//    module("logger", {
//        setup: function () {
//            TC.Loggers.test = sinon.spy();
//            logger = new TC.Types.Logger();
//            logger.setLogger('test');
//        }
//    });

//    test("logger is called with level and message", function() {
//        logger.warn('test');
//        ok(TC.Loggers.test.calledOnce);
//        ok(TC.Loggers.test.calledWithExactly('warn', 'test'));
//    });

//    test("default log level logs everything", function() {
//        logger.debug();
//        logger.info();
//        logger.warn();
//        logger.error();
//        equal(TC.Loggers.test.callCount, 4);
//    });

//    test("only levels equal or higher than the set value are logged", function () {
//        logger.setLogLevel('warn');
//        logger.debug();
//        logger.info();
//        ok(TC.Loggers.test.notCalled);
//        logger.warn();
//        logger.error();
//        ok(TC.Loggers.test.calledTwice);
//    });
//})();


// Tests/serializer.tests.js

module('serializer');

test("extractMetadata adds observables to metadata", function () {
    var result = T.serializer.extractMetadata({
        p1: 1,
        p2: ko.observable(2),
        p3: ko.observableArray()
    });
    deepEqual(result.metadata.observables, ['p2', 'p3']);
});

test("extractMetadata resolves observables on target", function () {
    var result = T.serializer.extractMetadata({
        p1: 1,
        p2: ko.observable(2),
        p3: ko.observableArray()
    });
    equal(result.target.p2, 2);
    deepEqual(result.target.p3, []);
});

test("applyMetadata converts target values to observables", function () {
    var result = T.serializer.applyMetadata({
        p1: 1,
        p2: 2,
        p3: [3]
    }, { observables: ['p2', 'p3'] });
    ok(ko.isObservable(result.p2));
    ok(ko.isObservable(result.p3));
    ok(result.p3.push);
    equal(result.p1, 1);
    equal(result.p2(), 2);
    equal(result.p3()[0], 3);
});
