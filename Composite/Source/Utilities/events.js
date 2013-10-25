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

    // this used to use DOM functions to raise events, but IE8 doesn't support custom events
    // we'll use jQuery, but expose the originalEvent for DOM events and the jQuery event
    // for custom events (originalEvent is null for custom events).
    TC.Utils.raiseDocumentEvent = function (name, eventData) {
        var e = $.Event(name);
        e.eventData = eventData;
        $(document).trigger(e);
    };

    var handlers = {};

    // if a handler is used for more than one event, a leak will occur
    TC.Utils.handleDocumentEvent = function (name, handler) {
        $(document).on(name, internalHandler);
        handlers[handler] = internalHandler;
        
        function internalHandler(e) {
            handler(e.originalEvent || e);
        }
    };

    TC.Utils.detachDocumentEvent = function (name, handler) {
        $(document).off(name, handlers[handler]);
        delete handlers[handler];
    };
})();