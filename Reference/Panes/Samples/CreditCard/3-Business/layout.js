TC.registerModel(function (pane) {
    var details = {};
    pane.pubsub.owner.startSaga(CreditCardSaga, details);
    pane.startFlow(CreditCardFlow, details);
});