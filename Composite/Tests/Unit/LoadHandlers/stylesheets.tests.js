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
        ok(T.LoadHandlers.css(url, resourcePath, Test.Unit.context()).promise);
    });

    test("stylesheet handler adds stylesheet to page header", function () {
        response = ".test{}";
        T.LoadHandlers.css(url, resourcePath, Test.Unit.context());
        notEqual($('#__tribeStyles').html().indexOf(".test"), -1);
    });
})();
