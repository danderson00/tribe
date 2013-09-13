CreditCardFlow = function(flow, details) {
    this.handles = {
        onstart: flow.navigatesTo('welcome'),
        'CC.startPersonal': {
            onstart: flow.navigatesTo('personal'),
            'CC.addAccountDetails': flow.navigatesTo('contact')
        },
        'CC.startBusiness': {
            onstart: flow.navigatesTo('businessDetails'),
            'CC.addBusinessDetails': flow.navigatesTo('businessAccount'),
            'CC.addAccountDetails': flow.navigatesTo('contact')
        },
        'CC.addContact': flow.navigatesTo('confirm', details)
    };
};