Test.raiseDocumentEvent = function(name, eventData, state) {
    var e;
    if (document.createEvent) {
        e = document.createEvent("Event");
        e.initEvent(name, true, false);
    } else {
        e = document.createEventObject();
        e.eventType = name;
    }

    e.eventName = name;
    e.eventData = eventData;
    e.state = state;

    if (document.createEvent)
        document.dispatchEvent(e);
    else
        document.fireEvent("on" + e.eventType, e);
};