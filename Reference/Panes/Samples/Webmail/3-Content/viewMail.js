TC.registerModel(function (pane) {
    var self = this;
    
    this.data = ko.observable();

    this.initialise = function () {
        $.getJSON('Data/mail/' + pane.data.id, self.data);
    };
});