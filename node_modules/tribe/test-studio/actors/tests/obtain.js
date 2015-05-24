require('tribe').register.actor(function (actor) {
    var self = this;

    actor.isDistributed();
    actor.isScopedTo('actorId');

    actor.handles = {
        'topic': function () {
            self.count++;
        }
    };

    this.count = 0;
});
