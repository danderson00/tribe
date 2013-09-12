TC.registerModel(function(pane) {
    this.start = function () {
        pane.pubsub.publish('CreditCard.setType', 'personal');
    };
});