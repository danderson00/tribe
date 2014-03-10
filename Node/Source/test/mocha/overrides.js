var Mocha = require('mocha'),
    originalAddTest = Mocha.Suite.prototype.addTest;

// add the ability to return promises from tests
Mocha.Suite.prototype.addTest = function (test) {
    var tests = test.fn;

    test.async = true;
    test.sync = false;

    // override the original test function
    test.fn = function (done) {
        var returnValue = tests(done);
        if (isPromise(returnValue))
            // the done function passed from mocha will fail the test if we pass it an error
            returnValue.then(done).fail(done);
        else
            done();
    };
    return originalAddTest.call(this, test);
};

function isPromise(target) {
    return target && typeof(target.fin) === 'function' && typeof(target.fail) === 'function';
}