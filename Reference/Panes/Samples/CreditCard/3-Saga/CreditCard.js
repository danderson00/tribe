CreditCard = function (saga, details) {
    this.handles = {
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