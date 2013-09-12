TC.registerModel(function(pane) {
    var self = this;
    
    this.details = pane.data;    
    this.details.limit = ko.observable();
    this.details.cards = ko.observable();

    this.next = function() {
        pane.navigate('confirm', self.details);
    };
});