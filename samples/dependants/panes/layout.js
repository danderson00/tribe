require('tribe').register.model(function (pane) {
    var self = this;

    pane.pubsub.owner.sync = true;

    this.initialise = function () {
        return pane.pubsub.obtainActor('adapter', 1).then(function (actor) {
            self.before = actor.beforePublish;
            self.after = actor.afterPublish;
            self.count = actor.count;
        });
    };

    this.send = function () {
        pane.pubsub.publish('input');
    };
});