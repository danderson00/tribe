(function () {
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