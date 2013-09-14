(function() {
    ko.bindingHandlers.validatedClick = {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var newValueAccessor = function () { return validatedClick; };
            
            return ko.bindingHandlers.click.init(element, newValueAccessor, allBindingsAccessor, viewModel);

            function validatedClick(arg) {
                var target = cleanModel(arg);
                var errors = ko.validation.group(target, { deep: true });
                if (errors().length > 0)
                    errors.showAllMessages();
                else
                    valueAccessor()(arg);
            }
            
            function cleanModel(model) {
                // clone so we don't affect the original
                model = $.extend({}, model);

                for (var property in model)
                    if (model.hasOwnProperty(property)) {
                        var value = model[property];
                        // ignore Tribe embedded properties that cause the validator to loop infinitely
                        if (property.substr(0, 2) === "__" ||
                            (value && (
                                value.constructor === TC.Types.Node ||
                                value.constructor === TC.Types.Pane
                            )))
                            delete model[property];                        
                    }

                return model;
            }
        }
    };
})();