TC.registerModel(function(pane) {
    this.personal = function() {
        pane.startFlow(PersonalFlow3);
    };

    this.business = function () {
        pane.startFlow(BusinessFlow3);
    };
});