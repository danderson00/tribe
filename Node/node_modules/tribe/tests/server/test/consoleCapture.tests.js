suite('tribe.test.consoleCapture', function () {
    var consoleCapture = require('tribe/test/consoleCapture');

    test("end returns captured output", function () {
        var capture = consoleCapture.capture();
        console.log('test');
        console.error(new Error('testError'));
        expect(capture.end()).to.have.string('test\n');
        expect(capture.end()).to.have.string('testError\n');
    });
});