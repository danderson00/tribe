BusinessFlow2 = function (flow) {
    var details = { type: 'business' };
    
    this.handles = {
        onstart: flow.to('businessDetails'),
        'CC.setBusiness': function(business) {
            details.business = business;
            flow.navigate('businessAccount');
        },
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