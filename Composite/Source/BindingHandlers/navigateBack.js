ko.bindingHandlers.navigateBack = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var node = TC.nodeFor(element);
        if (!node) return;

        ko.bindingHandlers.click.init(element, navigateBack, allBindingsAccessor, viewModel);

        function navigateBack() {
            return function () {
                node.navigateBack();
            };
        }
    }
};