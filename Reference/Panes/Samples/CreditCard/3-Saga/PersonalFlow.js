PersonalFlow3 = function (flow) {
    var details = { type: 'personal' };
    flow.startSaga(CreditCard, details);

    this.handles = {
        onstart: flow.to('personal'),
        'setAccount': flow.to('contact'),
        'setContact': flow.endsAt('confirm', details)
    };
};