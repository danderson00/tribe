require('tribe').register.actor(function (actor) {
    actor.isDistributed();

    actor.data = ko.observable(0);

    actor.handles = {
        'counter.increment': function () {
            actor.data(actor.data() + 1);
        }
    };

    this.count = actor.data;
});