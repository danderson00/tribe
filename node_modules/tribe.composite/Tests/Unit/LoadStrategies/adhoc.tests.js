(function () {
    var context;
    
    module("Unit.LoadStrategies.adhoc", {
        setup: function () { context = Test.Unit.context(); }
    });

    test("loader.get is called for each resource", function () {
        T.LoadStrategies.adhoc({ path: 'new' }, context);
        ok(context.loader.get.calledThrice);
        ok(context.loader.get.firstCall.calledWithExactly('new.js', 'new', context));
        ok(context.loader.get.secondCall.calledWithExactly('new.htm', 'new', context));
        ok(context.loader.get.thirdCall.calledWithExactly('new.css', 'new', context));
    });

    test("loader.get is called with base path combined with pane path", function () {
        context = Test.Unit.context();
        context.options.basePath = 'panes';
        T.LoadStrategies.adhoc({ path: 'test2' }, context);
        ok(context.loader.get.firstCall.calledWithExactly('panes/test2.js', 'test2', context));
    });

    test("subsequent calls with the same path returns the same deferred object", function () {
        var deferred = $.Deferred();
        context.loader.get = function() { return deferred; };
        var result1 = T.LoadStrategies.adhoc({ path: 'test' }, context);
        var result2 = T.LoadStrategies.adhoc({ path: 'test' }, context);
        equal(result1, result2);
    });

    test("subsequent calls with the same path returns null after the deferred has been resolved", function () {
        var deferred = $.Deferred();
        context.loader.get = function () { return deferred; };
        T.LoadStrategies.adhoc({ path: 'test' }, context);
        deferred.resolve();
        equal(T.LoadStrategies.adhoc({ path: 'test' }, context), null);
    });

    test("subsequent calls with the same path returns null after the deferred has been rejected", function () {
        var deferred = $.Deferred();
        context.loader.get = function () { return deferred; };
        T.LoadStrategies.adhoc({ path: 'test' }, context);
        deferred.reject();
        equal(T.LoadStrategies.adhoc({ path: 'test' }, context), null);
    });

    test("loader.get is not called when model has been loaded", function () {
        T.LoadStrategies.adhoc({ path: 'test' }, context);
        ok(context.loader.get.notCalled);
    });

    test("loader.get is not called when template has been loaded", function () {
        context.templates.loaded = function() { return true; };
        T.LoadStrategies.adhoc({ path: 'new' }, context);
        ok(context.loader.get.notCalled);
    });
})();