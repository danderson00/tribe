module('Unit.Utilities.elementDestroyed');

test("promise resolves when element is removed using jQuery", function () {
    expect(1);
    var element = $('<div/>').appendTo('#qunit-fixture');
    $.when(T.Utils.elementDestroyed(element)).done(function() {
        ok(true);
    });
    element.remove();
});

asyncTest("promise resolves when element is removed using native functions", function () {
    if (Test.supportsMutationEvents) {
        expect(1);
        var element = $('<div/>').appendTo('#qunit-fixture');
        $.when(T.Utils.elementDestroyed(element)).done(function() {
            ok(true);
            start();
        });
        element[0].parentNode.removeChild(element[0]);
    } else {
        // this should really be a warning
        ok(true, "Browser does not support DOM mutation events. Only elements removed with jQuery will be properly cleaned in this browser.");
        start();
    }
});
