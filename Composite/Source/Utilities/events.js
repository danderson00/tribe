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

    TC.Utils.raiseDocumentEvent = function (name, data) {
        var event = document.createEvent("Event");
        event.initEvent(name, true, false);
        event.data = data;
        document.dispatchEvent(event);
    };

    TC.Utils.handleDocumentEvent = function (name, handler) {
        document.addEventListener(name, internalHandler);

        return {
            dispose: dispose
        };

        function internalHandler(e) {
            handler(e.data, e);
        }

        function dispose() {
            document.removeEventListener(name, internalHandler);
        }
    };    
})();