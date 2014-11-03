require('tribe').register.actor(function (actor) {
    var self = this,
        state = actor.requires('state');

    actor.handles = {
        'input': function () {
            self.beforePublish(state.count());
            actor.pubsub.publish('logic', { actorId: 1 });
            self.afterPublish(state.count());
        }
    };

    this.beforePublish = ko.observable(state.count());
    this.afterPublish = ko.observable(state.count());
    this.count = state.count;
});