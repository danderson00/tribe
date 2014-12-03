﻿suite('tribe.logger', function () {
    var logger = require('tribe.logger');

    test("log parses level from message", function () {
        var spy = sinon.spy(logger, 'debug');
        logger.log('DEBUG: test\r\n');
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.equal('test');
        spy.restore();
    });
});