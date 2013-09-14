ko.bindingHandlers.navigate = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var node = TC.nodeFor(element);
        if (!node) return;

        var data = TC.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);
        var handler = ko.bindingHandlers.validatedClick || ko.bindingHandlers.click;
        handler.init(element, navigate, allBindingsAccessor, viewModel);

        function navigate() {
            return function () {
                node.navigate(data.value, TC.Utils.cloneData(data.data));
            };
        }
    }
};