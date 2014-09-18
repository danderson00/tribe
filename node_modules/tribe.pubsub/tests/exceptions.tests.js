suite('tribe.pubsub.exceptions', function () {
    var pubsubModule = require('../pubsub'),
        options = require('../options'),
        pubsub;

    setup(function () {
        pubsub = new pubsubModule();
    });

    test("when handleExceptions is true, publishSync should call all subscribers, even if there are exceptions", function () {
        var spy = sinon.spy();

        pubsub.subscribe("0", errorFunction);
        pubsub.subscribe("0", spy);

        pubsub.publishSync("0");

        assert.ok(spy.called);
    });

    test("when handleExceptions is true, exceptionHandler is called when exception occurs in subscriber", function () {
        var oldHandler = options.exceptionHandler;
        options.exceptionHandler = sinon.spy();

        pubsub.subscribe("0", errorFunction);
        pubsub.publishSync("0");

        assert.ok(options.exceptionHandler.called);
        options.exceptionHandler = oldHandler;
    });

    test("when handleExceptions is false, exceptions thrown in subscribers will be unhandled", function() {
        options.handleExceptions = false;

        assert.throws(function() {
            pubsub.subscribe("0", errorFunction);
            pubsub.publishSync("0");
        });

        options.handleExceptions = true;
    });
    
    function errorFunction() {
        throw ('some error');
    }
});
