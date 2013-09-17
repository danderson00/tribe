CreditCard = function (saga, details) {
    this.handles = {
        'startBusiness': function() {
            details.type = 'business';
        },
        'startPersonal': function() {
            details.type = 'personal';
        },
        'setAccount': function (account) {
            details.account = account;
        },
        'setBusiness': function (business) {
            details.business = business;
        },
        'setContact': function (contact) {
            details.contact = contact;
        }
    };
};