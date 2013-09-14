TC.registerModel(function(pane) {
    this.personal = function() {
        pane.startFlow(PersonalFlow2);
    };

    this.business = function () {
        pane.startFlow(BusinessFlow2);
    };
});