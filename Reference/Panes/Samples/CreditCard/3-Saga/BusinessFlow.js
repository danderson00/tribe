BusinessFlow3 = function (flow) {
    var details = { type: 'business' };
    flow.startSaga(CreditCard, details);

    this.handles = {
        onstart: flow.to('businessDetails'),
        'CC.setBusiness': flow.to('businessAccount'),
        'CC.setAccount': flow.to('contact'),
        'CC.setContact': flow.endsAt('confirm', details)
    };
};