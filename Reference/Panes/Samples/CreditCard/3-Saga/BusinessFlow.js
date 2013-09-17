BusinessFlow3 = function (flow) {
    var details = { type: 'business' };
    flow.startSaga(CreditCard, details);

    this.handles = {
        onstart: flow.to('businessDetails'),
        'setBusiness': flow.to('businessAccount'),
        'setAccount': flow.to('contact'),
        'setContact': flow.endsAt('confirm', details)
    };
};