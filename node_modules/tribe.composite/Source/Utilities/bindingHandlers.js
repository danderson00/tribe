(function () {
    ko.bindingHandlers.cssClass = {
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            if (value)
                $(element).addClass(ko.utils.unwrapObservable(value));
        }
    };

    ko.bindingHandlers.enterPressed = keyPressedBindingHandler(13);
    ko.bindingHandlers.escapePressed = keyPressedBindingHandler(27);
    
    function keyPressedBindingHandler(which) {
        return {
            init: function (element, valueAccessor) {
                var $element = $(element);
                var callback = valueAccessor();
                if ($.isFunction(callback))
                    $element.keyup(testKey);

                function testKey(event) {
                    if (event.which === which) {
                        //$element.blur();
                        callback($element.val());
                    }
                }
            }
        };
    }

})();