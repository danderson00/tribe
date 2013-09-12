CreditCardSaga = function(pane) {
    var details = { };

    this.handles = {
        onstart: function() {
            pane.navigate('welcome');
        },
        'CreditCard.setType': function (type) {
            details.type = type;
            pane.navigate('contact');
        },
        'CreditCard.addContact': function(contact) {
            details.contact = contact;
            pane.navigate('account');
        },
        'CreditCard.addAccountDetails': function(account) {
            details.account = account;
            pane.navigate('confirm', details);
        }
    };

    this.pubsub = pane.pubsub;
};