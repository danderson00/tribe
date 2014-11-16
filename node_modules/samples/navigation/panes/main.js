require('tribe').register.model(function (pane) {
    this.one = function () {
        pane.pubsub.publish('task.add', 'one');
    };

    this.two = function () {
        pane.pubsub.publish('task.add', 'two');
    };

    this.three = function () {
        pane.pubsub.publish('task.add', 'three');
    };

    this.onetwo = function () {
        pane.pubsub.publish('task.add', 'one');
        pane.pubsub.publish('task.add', 'two');
    };

    this.onethree = function () {
        pane.pubsub.publish('task.add', 'one');
        pane.pubsub.publish('task.add', 'three');
    };
});