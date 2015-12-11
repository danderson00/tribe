require('tribe').register.actor(function (actor) {
	this.messages = ko.observableArray()
	
	actor.handles({
		'message': message => this.messages.push((message.name || 'Anonymous') + ': ' + message.text) 
	})
})