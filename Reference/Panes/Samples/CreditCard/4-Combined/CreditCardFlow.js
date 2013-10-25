CreditCardFlow = function (flow) {
    var details = { };
    flow.startSaga(CreditCard, details);

    this.handles = {
        onstart: flow.to('welcome'),
        'startBusiness': {
            onstart: flow.to('businessDetails'),
            'setBusiness': flow.to('businessAccount'),
            'setAccount': flow.to('contact')
        },
        'startPersonal': {
            onstart: flow.to('personal'),
            'setAccount': flow.to('contact')
        },
        'setContact': flow.endsAt('confirm', details)
    };
};