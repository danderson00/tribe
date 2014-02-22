T.registerModel(function (pane) {
    var self = this;

    this.data = ko.observable();

    this.initialise = function () {
        $.getJSON('Data/folder/' + pane.data.folder, self.data);
    };
    
    this.selectMail = function (mail) {
        pane.navigate('viewMail', mail);
    };
});