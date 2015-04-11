require('tribe').register.model(function (pane) {
  var self = this,
      uuid = require('node-uuid');

  this.initialise = function() {
    pane.pubsub.obtainActor('list', { userId: 'test' }).then(function (actor) {
      self.todos = actor.todos;
    })
  };

  this.newText = ko.observable();

  this.view = function (todo) {}

  this.create = function () {
    pane.pubsub.publish('todo.add', { id: uuid.v4(), text: self.newText(), userId: 'test' })
  }
})
