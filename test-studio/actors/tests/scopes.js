require('tribe').register.actor(function (actor) {
    actor.isDistributed();
    actor.isScopedTo('test');
});