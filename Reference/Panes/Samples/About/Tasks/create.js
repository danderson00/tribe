// Declare model constructors using this simple function.
// Tribe creates an instance and binds it to the template.

T.registerModel(function (pane) {
    var self = this;
    
    this.task = ko.observable();
    
    this.create = function() {
        pane.pubsub.publish('task.create', self.task());
        self.task('');
    };
});