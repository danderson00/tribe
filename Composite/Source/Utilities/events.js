TC.Utils.raiseDocumentEvent = function(name, data) {
    var event = document.createEvent("Event");
    event.initEvent(name, true, false);
    event.data = data;
    document.dispatchEvent(event);
};
