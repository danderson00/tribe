require('tribe').register.actor(function (actor) {
    var self = this
    actor.isDistributed()
    actor.isScopedTo('id')

    actor.handles({
        'create': function (todo) {
            self.text(todo.text)
        },
        'complete': function () {
            self.complete(true)
        },
        'rename': function (todo) {
            self.text(todo.text)
        }
    })

    self.text = ko.observable()
    self.complete = ko.observable(false)
})
