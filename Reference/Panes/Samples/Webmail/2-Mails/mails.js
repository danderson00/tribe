TC.registerModel(function (pane) {
    var self = this;

    this.data = ko.observable();

    // Load data using AJAX to our data property    
    this.initialise = function() {
        $.getJSON('Data/folder/' + pane.data.folder, self.data);
    };
});