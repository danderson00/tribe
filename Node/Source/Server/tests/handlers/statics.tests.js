module('tribe.handlers.statics');

test("register adds handler to handlers array", function () {
    var statics = require('tribe/handlers/statics');
    var handler = {};

    statics.register('message', handler);
    equal(statics.handlers[0].func, handler);
});

test("start executes handler with corresponding topic", function () {
    var handler = sinon.spy();
    var statics = require('tribe/handlers/statics');

    statics.register('message', handler);
    statics.start({ topic: 'message' });
    ok(handler.calledOnce);
});

test("start executes handler when filter passes", function () {
    var handler = sinon.spy();
    var statics = require('tribe/handlers/statics');

    statics.register(filter, handler);
    statics.start({ topic: 'message' });
    ok(handler.notCalled);
    statics.start({ topic: 'message2' });
    ok(handler.calledOnce);

    function filter(envelope) {
        return envelope.topic === 'message2';
    }
});

test("handler.publish from static handler broadcasts message", function () {
    var channels = { broadcast: sinon.spy() };
    require.mock('tribe/server/channels', channels);
    var statics = require('tribe/handlers/statics');

    statics.register('message', function (handler, envelope) {
        handler.publish('message2');
    });
    statics.start({ topic: 'message' });
    ok(channels.broadcast.calledOnce);
    equal(channels.broadcast.firstCall.args[0].topic, 'message2');
});
