(function() {
    ko.bindingHandlers.validatedClick = {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var newValueAccessor = function() {
                return validatedClick;
            };
            return ko.bindingHandlers.click.init(element, newValueAccessor, allBindingsAccessor, viewModel);

            function validatedClick(arg) {
                // knockout validation adds some properties to the object, clone so we don't affect the original
                var target = $.extend({}, arg);
                
                // we also want to ignore Tribe embedded properties or they cause the validator to loop infinitely
                delete target.__context;
                delete target.__node;
                
                var errors = ko.validation.group(target, { deep: true });
                if (errors().length > 0)
                    errors.showAllMessages();
                else
                    valueAccessor()(arg);
            }
        }
    };
})();