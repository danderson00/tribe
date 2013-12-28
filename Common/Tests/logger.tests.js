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