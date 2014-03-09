module('tribe.load');

test("loading a file wraps and executes content", function () {
    var vm = stub('vm', { runInNewContext: sinon.stub().returns(function () {}) }),
        load = require('tribe/load');

    return load.file(__dirname + '/load/test.js')
        .then(function() {
            ok(vm.runInNewContext.calledOnce);
        });
});

//test("load includes __dirname and __filename arguments", function () {
//});

//test("", function () {
//});

//test("", function () {
//});
