(function () {
    var helpers = Test.Integration;

    helpers.executeEvents = function (events, pane, data) {
        TC.options.events = events;
        TC.options.basePath = 'Integration/Panes';
        $('#qunit-fixture').append('<div data-bind="pane: \'' + pane + '\', data: \'' + data + '\'"></div>');
        ko.applyBindings();
    };

    helpers.executeDefaultEvents = function (pane) {
        helpers.executeEvents(TC.defaultOptions().events, pane);
    };

    helpers.createTestElement = function() {
        $('#qunit-fixture').append('<div class="test"/>');
    };

    helpers.testEventsUntil = function(event) {
        var events = [];
        var defaultEvents = TC.defaultOptions().events;
        for (var i = 0; i < defaultEvents.length; i++) {
            events.push(defaultEvents[i]);
            if (defaultEvents[i] === event)
                break;
        }
        TC.Events.spy = sinon.spy();
        events.push('spy');
        return events;
    };

    Test.raiseDocumentEvent = function(eventName, properties) {
        var event;
        if (document.createEvent) {
            event = document.createEvent("Event");
            event.initEvent(eventName, true, false);
        } else {
            event = document.createEventObject();
            event.eventType = eventName;
        }

        event.eventName = eventName;
        $.extend(event, properties);

        if (document.createEvent)
            document.dispatchEvent(event);
        else
            document.fireEvent("on" + eventName, event);
    };
})();
