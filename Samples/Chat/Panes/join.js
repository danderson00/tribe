TC.registerModel(function (pane) {
    var self = this;
    this.name = ko.observable();
    
    this.join = function() {
        pane.navigate('channel', { member: { name: self.name() } });
    };
});