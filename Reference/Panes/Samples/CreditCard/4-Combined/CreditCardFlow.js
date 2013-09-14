CreditCardFlow = function (flow) {
    var details = { };
    flow.startSaga(CreditCard, details);

    this.handles = {
        onstart: flow.to('welcome'),
        'CC.startBusiness': {
            onstart: flow.to('businessDetails'),
            'CC.setBusiness': flow.to('businessAccount'),
            'CC.setAccount': flow.to('contact'),
        },
        'CC.startPersonal': {
            onstart: flow.to('personal'),
            'CC.setAccount': flow.to('contact'),
        },
        'CC.setContact': flow.endsAt('confirm', details)
    };
};