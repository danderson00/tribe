PersonalFlow3 = function (flow) {
    var details = { type: 'personal' };
    flow.startSaga(CreditCard, details);

    this.handles = {
        onstart: flow.to('personal'),
        'CC.setAccount': flow.to('contact'),
        'CC.setContact': flow.endsAt('confirm', details)
    };
};