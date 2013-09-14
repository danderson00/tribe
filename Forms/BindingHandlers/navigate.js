ko.bindingHandlers.navigate = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        if (!TC) return;
        var node = TC.nodeFor(element);
        if (!node) return;

        ko.bindingHandlers.validatedClick.init(element, navigate, allBindingsAccessor, viewModel);

        function navigate() {
            return function() {
                node.navigate(valueAccessor(), TF.Utils.cloneData(viewModel));
            };
        }
    }
};