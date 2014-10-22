require('tribe').register.model(function (pane) {
    var self = this;

    this.initialise = function () {
        return pane.pubsub.obtainActor('room', pane.data.name).then(function (actor) {
            self.messages = actor.messages;
        });
    };

    this.name = pane.data.name;
    this.message = ko.observable();

    this.send = function () {
        pane.pubsub.publish('chat.message', { message: self.message(), room: pane.data.name });
    };

    this.leave = function () {
        pane.remove();
    };
})