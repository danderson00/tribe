﻿suite('tribe.server.http.modules.memory', function () {
    var memory, callback, res;

    setup(function () {
        require.refresh('tribe/server/modules/memory');
        memory = require('tribe/server/modules/memory');

        memory.register('test', { 'file.htm': 'html' });
        memory('/test', 'test').http({ use: captureCallback });

        res = {};
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns({ end: function () { } });
        res.type = sinon.stub().returns(res);
    });

    test("sends files that have been registered", function () {
        callback({ path: '/test/file.htm' }, res);
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.equal('html');
    });

    test("returns 404 when file has not been registered", function () {
        callback({ path: '/test/nofile.htm' }, res);
        expect(res.status.calledOnce).to.be.true;
        expect(res.status.firstCall.args[0]).to.equal(404);
    });

    test("mapFile sends files that have been registered", function () {
        memory.mapFile('/', 'test', 'file.htm').http({ all: captureCallback });

        callback({ path: '', useragent: { isMobile: false }, query: {} }, res);
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.equal('html');
    });

    test("mapFile returns 404 when file has not been registered", function () {
        memory.mapFile('/', 'test', 'file2.htm').http({ all: captureCallback });

        callback({ path: '', useragent: { isMobile: false }, query: {} }, res);
        expect(res.status.calledOnce).to.be.true;
        expect(res.status.firstCall.args[0]).to.equal(404);
    });

    function captureCallback(path, func) {
        callback = func;
    }
});