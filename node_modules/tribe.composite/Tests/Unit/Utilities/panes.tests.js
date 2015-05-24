(function () {
    var utils = T.Utils;
    
    module('Unit.Utilities.panes');

    test("getPaneOptions", function () {
        deepEqual(utils.getPaneOptions('test'), { path: 'test' }, "accepts string value as path");
        deepEqual(utils.getPaneOptions('test', { data: 'data' }), { path: 'test', data: 'data' }, "accepts string value as path and merges other options");
        deepEqual(utils.getPaneOptions({ path: 'test' }), { path: 'test' }, "accepts options object");
        deepEqual(utils.getPaneOptions({ path: 'test' }, { data: 'data' }), { path: 'test', data: 'data' }, "accepts options object and merges other options");
    });
})();
