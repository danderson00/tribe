ko.bindingHandlers.factory = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var data = TC.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);
        data.value = data.value || {};
        
        if (data.value.constructor === String)
            data.value = TF.Utils.evaluateProperty(viewModel, data.value, {});

        var childContext = bindingContext.createChildContext(data.value);
        childContext.__factory = true;
        ko.applyBindingsToDescendants(childContext, element);

        return { controlsDescendantBindings: true };
    }
};