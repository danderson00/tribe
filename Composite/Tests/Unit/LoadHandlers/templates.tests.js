(function() {
    var url = 'test.htm';
    var resourcePath = '/test';
    var response = '<br/>';
    var context;
    
    $.mockjax({
        url: url,
        response: function() { this.responseText = response; }
    });

    module('Unit.LoadHandlers.templates', {
        setup: function () { context = Test.Unit.context(); }
    });

    test("template handler returns promise object", function() {
        ok(T.LoadHandlers.htm(url, resourcePath, context).promise);
    });

    test("template is stored with resource path identifier", function() {
        T.LoadHandlers.htm(url, resourcePath, context);
        ok(context.templates.store.calledOnce);
        ok(context.templates.store.calledWithExactly('<br/>', '/test'));
    });
})();
