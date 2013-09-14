CreditCard = function (saga, details) {
    this.handles = {
        'CC.startBusiness': function() {
            details.type = 'business';
        },
        'CC.startPersonal': function() {
            details.type = 'personal';
        },
        'CC.setAccount': function (account) {
            details.account = account;
        },
        'CC.setBusiness': function (business) {
            details.business = business;
        },
        'CC.setContact': function (contact) {
            details.contact = contact;
        }
    };
};