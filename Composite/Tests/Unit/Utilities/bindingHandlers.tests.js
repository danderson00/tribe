(function() {
    module('Unit.Utilities.bindingHandlers');

    test("enterPressed executes callback when enter keyup event occurs in specified element, passing element value", function () {
        var element = $('<input/>').appendTo('#qunit-fixture');
        var spy = sinon.spy();
        ko.bindingHandlers.enterPressed.init(element[0], function () { return spy; });
    
        ok(spy.notCalled);
        element.val('value');
        element.trigger(keyEvent('keyup', 13));
        ok(spy.calledOnce);
        ok(spy.calledWithExactly('value'));
    });
    
    function keyEvent(eventName, which) {
        var event = jQuery.Event(eventName);
        event.which = which;
        return event;
    }
})();
