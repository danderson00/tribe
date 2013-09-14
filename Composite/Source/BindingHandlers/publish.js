ko.bindingHandlers.publish = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var pubsub = TC.nodeFor(element).pane.pubsub;
        if (!pubsub) return;

        var data = TC.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);
        var handler = ko.bindingHandlers.validatedClick || ko.bindingHandlers.click;
        handler.init(element, publishAccessor, allBindingsAccessor, viewModel);

        function publishAccessor() {
            return function () {
                pubsub.publish(data.value, TC.Utils.cloneData(data.data));
            };
        }
    }
};