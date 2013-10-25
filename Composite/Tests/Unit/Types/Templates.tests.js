(function () {
    var templates;
    
    module('Unit.Types.Templates', {
        setup: function () { templates = new TC.Types.Templates(); },
        teardown: function () { $('head script[type="text/template"]').remove(); }
    });

    test("store wraps template in script tag with resource path as id", function() {
        templates.store('<br/>', 'test');
        notEqual($('head script#template-test').html().indexOf('<br/>'), -1);
    });

    test("render replaces content of target with stored template", function () {
        $('#qunit-fixture').text('previous');
        templates.store('content', 'test');
        templates.render('#qunit-fixture', 'test');
        notEqual($('#qunit-fixture').html().indexOf('content'), -1);
    });
    
    test("loaded returns true if template has been loaded for specified path", function () {
        templates.store('<br/>', 'test');
        ok(templates.loaded('test'));
    });
})();