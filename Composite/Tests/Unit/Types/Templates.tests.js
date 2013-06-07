(function () {
    var templates;
    
    module('Unit.Types.Templates', {
        setup: function () { templates = new TC.Types.Templates(); },
        teardown: function () { $('head script[type="text/template"]').remove(); }
    });

    test("store wraps template in script tag with resource path as id", function() {
        templates.store('<br/>', 'test');
        equal($('head script#template-test').text(), '<br/>');
    });

    test("store appends multiple wrapped templates", function () {
        templates.store('<script type="text/template" id="test1">test1</script><script type="text/template" id="test2">test2</script>');
        equal($('head script#test1').text(), 'test1');
        equal($('head script#test2').text(), 'test2');
    });

    test("store ignores unwrapped templates", function () {
        templates.store('<script type="text/template" id="test1">test1</script>blah<br/><script type="text/template" id="test2">test2</script>');
        equal($('head script#test1').text(), 'test1');
        equal($('head script#test2').text(), 'test2');
    });

    test("render replaces content of target with stored template", function () {
        $('#qunit-fixture').text('previous');
        templates.store('content', 'test');
        templates.render('#qunit-fixture', 'test');
        equal($('#qunit-fixture').text(), 'content');
    });
    
    test("loaded returns true if template has been loaded for specified path", function () {
        templates.store('<br/>', 'test');
        ok(templates.loaded('test'));
    });
})();