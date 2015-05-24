(function() {
    module('Integration.Events.loadResources', {
        setup: function () { Test.Integration.executeEvents(['loadResources'], 'Events/basic'); },
        teardown: Test.Integration.teardown
    });

    test("loadResources loads model", function () {
        ok(Test.Integration.context.models['/Events/basic']);
    });

    test("loadResources loads template", function () {
        equal($('#template--Events-basic').length, 1);
    });

    test("loadResources loads style", function () {
        notEqual($('#__tribeStyles').html().indexOf('.basic'), -1);
    });

})();