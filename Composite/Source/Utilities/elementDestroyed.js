﻿TC.Utils.elementDestroyed = function (element) {
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
        promise.resolve();
        $(element).off('destroyed', resolve);
        $(document).off('DOMNodeRemoved', matchElement);
    }

    return promise;
};