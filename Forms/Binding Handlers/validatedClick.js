(function() {
    ko.bindingHandlers.validatedClick = {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var newValueAccessor = function() {
                return validatedClick;
            };
            return ko.bindingHandlers.click.init(element, newValueAccessor, allBindingsAccessor, viewModel);

            function validatedClick(arg) {
                // ignore the embedded properties or they cause the validator to loop infinitely
                var target = $.extend(this, { __context: null, __node: null });
                var errors = ko.validation.group(target, { deep: true });
                if (errors().length > 0)
                    errors.showAllMessages();
                else
                    valueAccessor()(arg);
            }
        }
    };
})();