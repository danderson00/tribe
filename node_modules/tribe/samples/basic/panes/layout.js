require('tribe').register.model(function (pane) {
    var self = this;

    this.initialise = function () {
        return pane.pubsub.obtainActor('counter', 1)
            .then(function (counter) {
                self.counter = counter;
            });
    };

    this.increment = function () {
        pane.pubsub.publish('counter.increment');
    };
});