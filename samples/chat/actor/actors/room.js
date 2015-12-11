require('tribe').register.actor(function (actor) {
	actor.isDistributed()
	
	this.chatMessages = ko.observableArray()
	
	actor.handles({
		'message': message => this.chatMessages.push(message)
	})
})