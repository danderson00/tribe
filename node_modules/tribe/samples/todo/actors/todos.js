require('tribe').register.actor(function (actor) {
    var self = this
    actor.isDistributed()

    actor.handles({
        'create': function (todo) {
            self.ids.push(todo.id)
        },
        'complete': function (todo) {
            actor.data.completed.push(todo.id)
        },
        'clearCompleted': function () {
            actor.data.completed.forEach(function (id) {
                self.ids.remove(id)
            })
            actor.data.completed = []
        }
    })

    actor.data.completed = []

    this.ids = ko.observableArray()
})
