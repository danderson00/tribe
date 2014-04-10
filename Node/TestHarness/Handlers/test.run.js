T.registerHandler('test.run', function (data) {
    require('tribe/test').run(data);
});