require('tribe').register.model(function (pane) {
    var self = this,
        tasks;

    this.initialise = function () {
        pane.pubsub.obtainActor('tasks').then(function (actor) {
            tasks = actor.tasks;
            tasks.subscribe(tasksChanged);
        });
    };

    function tasksChanged() {
        if (tasks().length > 0)
            pane.navigate('tasks/' + tasks()[0]);
        else
            pane.navigate('main');
    }
});