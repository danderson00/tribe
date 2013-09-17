PersonalFlow = function (flow) {
    var details = { type: 'personal' };         // An object to hold application details
    
    this.handles = {                            
        onstart: flow.to('personal'),
        'setAccount': function(account) {       // As events occur, build up our details
            details.account = account;          // object and flow through the process
            flow.navigate('contact');
        },
        'setContact': function(contact) {
            details.contact = contact;
            flow.navigate('confirm', details);  // Our flow ends after navigating to the
            flow.end();                         // confirmation pane.
        }
    };
};