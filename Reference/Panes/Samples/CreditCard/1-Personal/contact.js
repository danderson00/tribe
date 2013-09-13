TC.registerModel(function(pane) {
    var self = this;
    
    this.details = pane.data;
    this.details.name = ko.observable();
    this.details.email = ko.observable();
    this.details.phone = ko.observable();

    this.next = function() {
        pane.navigate('confirm', self.details);
    };
});