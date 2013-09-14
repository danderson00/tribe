ko.bindingHandlers.form = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var data = TF.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);
        data.value = data.value || {};
        
        if (data.value.constructor === String) {
            var defaultValue = data.create ? {} : undefined;
            data.value = TF.Utils.evaluateProperty(viewModel, data.value, defaultValue);
        }

        var childContext = bindingContext.createChildContext(data.value);
        if (data.create) childContext.__create = true;
        ko.applyBindingsToDescendants(childContext, element);

        return { controlsDescendantBindings: true };
    }
};