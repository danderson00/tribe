//suite('tribe.process', function () {
//    var pubsub = require('tribe.pubsub');

//    var child, token;

//    teardown(function () {
//        if(child) child.end();
//        if (token) pubsub.unsubscribe(token);
//        child = undefined;
//        token = undefined;
//    });

//    test("child process publishes messages to message bus", function (done) {
//        //require.refresh('tribe/process');
//        var process = require('tribe/process');
//        token = pubsub.subscribe('test', done);
//        child = process.start({ path: require.resolve('process/child') });
//    });

//    test("channel messages are published to child message bus", function (done) {
//        //require.refresh('tribe/process');
//        var process = require('tribe/process');
//        token = pubsub.subscribe('fromChild', done);
//        child = process.start({ path: require.resolve('process/child'), channel: 'test' });
//        pubsub.publishSync({ topic: 'fromParent', channelId: 'test' });
//    });

//    // add tests for path relative to calling module

//    // add tests for channels

//    // add tests for logging / stdin/out handling
//});
