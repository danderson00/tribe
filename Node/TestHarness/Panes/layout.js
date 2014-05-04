T.registerModel(function (pane) {
    var self = this,
        saga,
        channel = pane.pubsub.channel('__test').connect();

    this.initialise = function () {
        return require('tribe').services('Tests').invoke().then(function (options) {
            options.fixture = require('construct').extendFixture(options.fixture);
            saga = channel.startSaga(null, 'session', options.fixture);
            self.options = options;
        });        
    };

    //this.renderComplete = function () {
    //    channel.publish('test.run');
    //};
});