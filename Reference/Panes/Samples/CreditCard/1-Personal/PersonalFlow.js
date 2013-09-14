PersonalFlow = function (flow) {
    var details = { type: 'personal' };
    
    this.handles = {
        onstart: flow.to('personal'),
        'CC.setAccount': function(account) {
            details.account = account;
            flow.navigate('contact');
        },
        'CC.setContact': function(contact) {
            details.contact = contact;
            flow.navigate('confirm', details);
            flow.end();
        }
    };
};