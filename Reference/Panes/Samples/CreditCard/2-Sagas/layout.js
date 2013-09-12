TC.registerModel(function(pane) {
    new TC.Types.Saga(new CreditCardSaga(pane)).start();
});