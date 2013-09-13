CreditCardFlow = function(flow, type) {
    var details = { type: type };

    this.handles = {
        onstart: flow.navigatesTo('account'),
        
        'CC.addAccountDetails': function(account) {
            details.account = account;
            flow.navigate('contact');
        },
        'CC.addContact': function(contact) {
            details.contact = contact;
            flow.navigate('confirm', details);
        },
    };
};