ko.bindingHandlers.scaffold = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var data = TC.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);
        data.value = data.value || {};

        TF.scaffold(data.value).to(element);
        return { controlsDescendantBindings: true };
    }
};