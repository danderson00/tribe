(function() {
    var utils = TC.Utils;
    var spy;

    module('Unit.Utilities.events', {
        setup: function () { spy = sinon.spy(); }
    });

    test("handleDocumentEvent executes handler when event is fired using raiseDocumentEvent", function () {
        utils.handleDocumentEvent('click', spy);
        utils.raiseDocumentEvent('click');
        ok(spy.calledOnce);
        utils.detachDocumentEvent('click', spy);
    });

    test("handleDocumentEvent executes handler when event is fired manually", function () {
        utils.handleDocumentEvent('click', spy);
        raise('click');
        ok(spy.calledOnce);
        utils.detachDocumentEvent('click', spy);
    });

    test("detachDocumentEvent removes handler attached with handleDocumentEvent", function () {
        utils.handleDocumentEvent('click', spy);
        utils.raiseDocumentEvent('click');
        utils.detachDocumentEvent('click', spy);
        utils.raiseDocumentEvent('click');
        ok(spy.calledOnce);
    });

    test("raiseDocumentEvent sets eventData property from argument", function() {
        var data = {};
        utils.handleDocumentEvent('click', spy);
        utils.raiseDocumentEvent('click', data);
        equal(spy.firstCall.args[0].eventData, data);
        utils.detachDocumentEvent('click', spy);
    });

    function raise(name) {
        var e;
        if (document.createEvent) {
            e = document.createEvent("Event");
            e.initEvent(name, true, false);
        } else {
            e = document.createEventObject();
            e.eventType = name;
        }

        e.eventName = name;

        if (document.createEvent)
            document.dispatchEvent(e);
        else
            document.fireEvent("on" + e.eventType, e);
    }
})();
