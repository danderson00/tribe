(function () {
    var pubsub;

    module('exceptions', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("when handleExceptions is true, publishSync should call all subscribers, even if there are exceptions", function () {
        var spy = sinon.spy();

        pubsub.subscribe("0", errorFunction);
        pubsub.subscribe("0", spy);

        pubsub.publishSync("0");

        ok(spy.called);
    });

    test("when handleExceptions is true, exceptionHandler is called when exception occurs in subscriber", function () {
        var oldHandler = Tribe.PubSub.options.exceptionHandler;
        Tribe.PubSub.options.exceptionHandler = sinon.spy();

        pubsub.subscribe("0", errorFunction);
        pubsub.publishSync("0");

        ok(Tribe.PubSub.options.exceptionHandler.called);
        Tribe.PubSub.options.exceptionHandler = oldHandler;
    });

    test("when handleExceptions is false, exceptions thrown in subscribers will be unhandled", function() {
        Tribe.PubSub.options.handleExceptions = false;

        raises(function() {
            pubsub.subscribe("0", errorFunction);
            pubsub.publishSync("0");
        });

        Tribe.PubSub.options.handleExceptions = true;
    });
    
    function errorFunction() {
        throw ('some error');
    }
})();
