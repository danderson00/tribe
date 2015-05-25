ko.bindingHandlers.actor = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var node = T.Utils.extractNode(bindingContext),
            context = T.Utils.extractContext(bindingContext),
            pubsub = node.pane.pubsub,
            token = {};

        context.renderOperation.add(token);

        pubsub.obtainActor(valueAccessor(), allBindingsAccessor().scope).then(function (actor) {
            ko.applyBindingsToDescendants(bindingContext.extend(actor), element);
            context.renderOperation.complete(token);
        }).fail(function (err) {
            T.logger.error('Failed to retrieve actor', err);
        });

        return { controlsDescendantBindings: true };
    }
}
