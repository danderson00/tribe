CreditCard = function (saga, details) {
    this.handles = {
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