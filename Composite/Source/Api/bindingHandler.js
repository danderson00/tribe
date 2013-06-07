(function() {
    ko.bindingHandlers.pane = { init: updateBinding };

    function updateBinding(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        TC.createNode(element, constructPaneOptions(), TC.Utils.extractNode(bindingContext), TC.Utils.extractContext(bindingContext));

        return { controlsDescendantBindings: true };

        function constructPaneOptions() {
            return TC.Utils.getPaneOptions(ko.utils.unwrapObservable(valueAccessor()), allBindingsAccessor());
        }
    }
})();
