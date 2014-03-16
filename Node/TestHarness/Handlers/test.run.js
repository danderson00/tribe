T.registerHandler('test.run', function (handler, envelope) {
    require('tribe/test').run();
});