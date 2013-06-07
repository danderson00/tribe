module('Unit.Utilities.elementDestroyed');

test("promise resolves when element is removed using jQuery", function () {
    expect(1);
    var element = $('<div/>').appendTo('#qunit-fixture');
    $.when(TC.Utils.elementDestroyed(element)).done(function() {
        ok(true);
    });
    element.remove();
});

asyncTest("promise resolves when element is removed using native functions", function () {
    expect(1);
    var element = $('<div/>').appendTo('#qunit-fixture');
    $.when(TC.Utils.elementDestroyed(element)).done(function () {
        ok(true);
        start();
    });
    element[0].parentNode.removeChild(element[0]);
});
