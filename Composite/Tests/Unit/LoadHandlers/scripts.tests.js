(function() {
    var originalEval = $.globalEval;
    var url = 'test.js';
    var resourcePath = '/test';
    var response = "";
    var context;
    
    $.mockjax({
        url: url,
        response: function() { this.responseText = response; }
    });
    
    module("Unit.LoadHandlers.scripts", {
        setup: function() {
            context = Test.Unit.context();
        },
        teardown: function () { $.globalEval = originalEval; }
    });

    test("script handler returns promise object", function() {
        ok(TC.LoadHandlers.js(url, resourcePath, context).promise);
    });

    test("script handler executes globalEval with response", function () {
        $.globalEval = sinon.spy();
        response = "test";
        TC.LoadHandlers.js(url, resourcePath, context);
        ok($.globalEval.calledOnce);
        equal($.globalEval.firstCall.args[0].substring(0, response.length), response);
    });

    test("script handler appends sourceURL tag", function () {
        $.globalEval = sinon.spy();
        response = "test";
        TC.LoadHandlers.js(url, resourcePath, context);
        ok($.globalEval.calledOnce);
        equal($.globalEval.firstCall.args[0].substring(response.length + 1), "//@ sourceURL=tribe://Application/test.js");
    });

    test("script handler sets TC.scriptEnvironment before executing scripts", function () {
        expect(1);
        response = "equal(TC.scriptEnvironment.resourcePath, '" + resourcePath + "');";
        TC.LoadHandlers.js(url, resourcePath, context);
    });

    test("script handler clears TC.scriptEnvironment after executing scripts", function () {
        TC.LoadHandlers.js(url, resourcePath, context);
        equal(TC.scriptEnvironment, undefined);
    });
})();
