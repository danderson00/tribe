﻿suite('tribe.utilities.watcher', function () {
    var callback,
        watcher;

    setup(function () {
        require.stub('watchr', {
            watch: function (options) {
                callback = options.listeners.change;
                return { close: function () { } };
            }
        });
        require.refresh('tribe/utilities/watcher');
        watcher = require('tribe/utilities/watcher');
    });

    test("single callback is executed with args from watchr", function () {
        var spy = sinon.spy();
        watcher.watch(null, spy);
        callback('update', 'path');
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args).to.deep.equal(['update', 'path']);
    });

    test("hash of callbacks are executed with simplified arguments", function () {
        var u = sinon.spy(),
            c = sinon.spy(),
            d = sinon.spy(),
            cu = sinon.spy();

        watcher.watch(null, {
            create: c,
            update: u,
            delete: d,
            createOrUpdate: cu
        });
        callback('create', 'path');
        callback('update', 'path');
        callback('delete', 'path');
        expect(c.calledOnce).to.be.true;
        expect(u.calledOnce).to.be.true;
        expect(d.calledOnce).to.be.true;
        expect(cu.calledTwice).to.be.true;
        expect(u.firstCall.args[0]).to.equal('path');
    });
});