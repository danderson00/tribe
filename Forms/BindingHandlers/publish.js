ko.bindingHandlers.publish = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        if (!TC) return;
        var pubsub = TC.nodeFor(element).pane.pubsub;
        if (!pubsub) return;

        ko.bindingHandlers.validatedClick.init(element, publishAccessor, allBindingsAccessor, viewModel);

        function publishAccessor() {
            return function() {
                pubsub.publish(valueAccessor(), TF.Utils.cloneData(viewModel));
            };
        }
    }
};