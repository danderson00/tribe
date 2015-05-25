require('tribe').register.actor(function (actor) {
    var self = this;

    actor.isDistributed();
    actor.isScopedTo('actorId');

    actor.handles({
        'logic': function () {
            self.count(self.count() + 1);
        }
    });

    this.count = ko.observable(0);
});
