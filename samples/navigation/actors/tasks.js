require('tribe').register.actor(function (actor) {
    var self = this;

    actor.handles({
        'task.add': function (data) {
            self.tasks.push(data);
        },
        'task.complete': function (data) {
            self.tasks.remove(data);
        }
    });

    this.tasks = ko.observableArray();
})
