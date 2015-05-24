ko.bindingHandlers.publish = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var pubsub = T.nodeFor(element).pane.pubsub;
        if (!pubsub) return;

        var data = T.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);
        var handler = ko.bindingHandlers.validatedClick || ko.bindingHandlers.click;
        handler.init(element, publishAccessor, allBindingsAccessor, viewModel, bindingContext);

        function publishAccessor() {
            return function () {
                pubsub.publish(data.value, T.Utils.cloneData(data.data));
            };
        }
    }
};