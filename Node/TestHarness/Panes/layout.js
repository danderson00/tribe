T.registerModel(function (pane) {
    var self = this,
        saga,
        channel = pane.pubsub.channel('__test').connect();

    this.initialise = function () {
        return T.services('Tests').invoke().then(function (fixture) {
            saga = channel.startSaga(null, 'session', fixture);
            self.fixture = fixture;
        });        
    };

    //this.renderComplete = function () {
    //    channel.publish('test.run');
    //};

    //this.tests = ko.observableArray();

    this.run = function () {
    //    self.tests.splice(0, self.tests().length);
        channel.publish('test.run');
    };

    //channel.subscribe('test.complete', function (test) {
    //    self.tests.push(test);
    //});

    //channel.subscribe('test.error', function (error) {
    //    self.tests.push(testFromError(error));
    //});

    //function testFromError(error) {
    //    return {
    //        module: 'Error running tests',
    //        failed: 1,
    //        passed: 0,
    //        total: 1,
    //        assertions: [
    //            {
    //                message: error,
    //                result: false
    //            }
    //        ]
    //    };
    //}
});