(function () {
    TC.Utils.elementDestroyed = function (element) {
        if (element.constructor === jQuery)
            element = element[0];

        var promise = $.Deferred();

        // Resolve when an element is removed using jQuery. This is a fallback for browsers not supporting DOMNodeRemoved and also executes synchronously.
        $(element).on('destroyed', resolve);

        // Resolve using the DOMNodeRemoved event. Not all browsers support this.
        $(document).on("DOMNodeRemoved", matchElement);

        function matchElement(event) {
            if (event.target === element)
                resolve();
        }

        function resolve() {
            $(element).off('destroyed', resolve);
            $(document).off('DOMNodeRemoved', matchElement);
            promise.resolve();
        }

        return promise;
    };

    TC.Utils.raiseDocumentEvent = function (name, data, state) {
        var event;
        if (document.createEvent) {
            event = document.createEvent("Event");
            event.initEvent(name, true, false);
        } else {
            event = document.createEventObject();
            event.eventType = name;
        }

        event.eventName = name;
        event.data = data;
        event.state = state;

        if (document.createEvent) {
            document.dispatchEvent(event);
        } else {
            document.fireEvent("on" + event.eventType, event);
        }
    };

    TC.Utils.handleDocumentEvent = function (name, handler) {
        if (document.addEventListener)
            document.addEventListener(name, handler, false);
        else if (document.attachEvent)
            document.attachEvent('on' + name, handler);
    };

    TC.Utils.detachDocumentEvent = function(name, handler) {
        if (document.removeEventListener)
            document.removeEventListener(name, handler);
        else if (document.detachEvent)
            document.detachEvent("on" + name, handler);
        else
            document["on" + name] = null;
    };
})();