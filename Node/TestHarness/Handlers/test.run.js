T.registerHandler('test.run', function (envelope) {
    require('tribe/test').run(envelope.data);
});