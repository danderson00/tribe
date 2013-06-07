(function() {
    var url = 'test.css';
    var resourcePath = '/test';
    var response = "";
    
    $.mockjax({
        url: url,
        response: function() { this.responseText = response; }
    });

    module('Unit.LoadHandlers.stylesheets');
    
    test("stylesheet handler returns promise object", function() {
        ok(TC.LoadHandlers.css(url, resourcePath, Test.Unit.context()).promise);
    });

    test("stylesheet handler adds stylesheet to page header", function () {
        response = "body{}";
        TC.LoadHandlers.css(url, resourcePath, Test.Unit.context());
        equal($('head style').last().text(), response);
    });

    test("stylesheet is added with id of resource", function () {
        response = "body{}";
        TC.LoadHandlers.css(url, resourcePath, Test.Unit.context());
        equal($('head style#style--test').last().text(), response);
    });
})();
