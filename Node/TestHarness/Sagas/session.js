require('tribe/register').saga(function (saga) {
T.registerSaga(function (saga) {
    var fixture;

    saga.handles = {
        onstart: function (data) {
            fixture = extendFixture(data);
        },
        'test.complete': updateTest,
        'test.loaded': updateTest,
        'test.removed': removeTest
    };

    function updateTest(update) {
        var test = findTest(update);
        test.stale(update.state === undefined);
        if(update.state) test.state(update.state);
        test.error(update.error);
        test.duration(update.duration);
    }
});
