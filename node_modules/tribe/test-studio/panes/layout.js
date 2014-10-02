require('tribe').register.model(function(pane) {
    var self = this,
        debugWindow = require('../modules/debugWindow'),
        actor;

    window.title = 'Tests: ' + window.title;

    this.initialise = function () {
        return require('tribe').services('__tests').invoke().then(function (options) {
            debugWindow.debugPort = options.debugPort;
            debugWindow.inspectorPort = options.inspectorPort;
            options.fixture = require('../modules/construct').extendFixture(options.fixture);
            actor = pane.pubsub.startActor('/session', null, { data: options.fixture });
            self.options = options;
        });        
    };
})