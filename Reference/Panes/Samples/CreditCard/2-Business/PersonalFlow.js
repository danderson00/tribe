PersonalFlow2 = function (flow) {
    var details = { type: 'personal' };
    
    this.handles = {
        onstart: flow.to('personal'),
        'setAccount': function(account) {
            details.account = account;
            flow.navigate('contact');
        },
        'setContact': function(contact) {
            details.contact = contact;
            flow.navigate('confirm', details);
            flow.end();
        }
    };
};