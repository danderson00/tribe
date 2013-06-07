(function() {
    var resources;
    var context;
    
    module("Unit.Types.Loader", {
        setup: function () {
            context = Test.Unit.context();
            resources = new TC.Types.Loader();
        }
    });

    test("get should call handler for file extension from passed url", function () {
        var spy = sinon.spy();
        TC.LoadHandlers.test = spy;
        resources.get('test.test');
        ok(spy.calledOnce);
    });

    test("get should call handler with url, resourcePath and context", function () {
        var spy = sinon.spy();
        TC.LoadHandlers.test = spy;
        resources.get('test.test', 'test/test', context);
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'test.test');
        equal(spy.firstCall.args[1], 'test/test');
        equal(spy.firstCall.args[2], context);
    });

    test("when passed the same url, get should return the same deferred from first call to handler", function () {
        var deferred = $.Deferred();
        TC.LoadHandlers.test = sinon.stub().returns(deferred);
        equal(resources.get('test.test'), deferred);
        equal(resources.get('test.test'), deferred);
    });

    test("get should return null after deferred from first call to handler completes", function () {
        var deferred = $.Deferred();
        TC.LoadHandlers.test = sinon.stub().returns(deferred);
        equal(resources.get('test.test'), deferred);
        deferred.resolve();
        equal(resources.get('test.test'), null);
    });

    test("get should return null after deferred from first call to handler fails", function () {
        var deferred = $.Deferred();
        TC.LoadHandlers.test = sinon.stub().returns(deferred);
        equal(resources.get('test.test'), deferred);
        deferred.reject();
        equal(resources.get('test.test'), null);
    });

    test("get should return different deferred for each unique url", function () {
        TC.LoadHandlers.test = function () { return $.Deferred(); };
        var result1 = resources.get('test1.test');
        var result2 = resources.get('test2.test');
        notEqual(result1, result2);
    });
})();
