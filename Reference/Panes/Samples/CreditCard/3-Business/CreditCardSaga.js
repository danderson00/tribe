CreditCardSaga = function (saga, details) {
    this.handles = {
        'CC.startPersonal': function () {
            details.type = 'personal';
        },
        'CC.startBusiness': function () {
            details.type = 'business';
        },
        'CC.addAccountDetails': function (account) {
            details.account = account;
        },
        'CC.addBusinessDetails': function(business) {
            details.business = business;
        },
        'CC.addContact': function(contact) {
            details.contact = contact;
        }
    };
};