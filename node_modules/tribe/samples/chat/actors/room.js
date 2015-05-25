require('tribe').register.actor(function (actor) {
    actor.isDistributed();
    actor.isScopedTo('room');

    actor.data = { messages: ko.observableArray() };

    actor.handles({
        'chat.message': function (data) {
            actor.data.messages.push(data.message);
        }
    });

    this.messages = actor.data.messages;
});
