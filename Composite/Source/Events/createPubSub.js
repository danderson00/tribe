TC.Events.createPubSub = function (pane, context) {
    if (context.pubsub)
        pane.pubsub = context.pubsub.createLifetime ?
            context.pubsub.createLifetime() :
            context.pubsub;
};
