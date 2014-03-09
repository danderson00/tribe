module('tribe.server.channels');

test("joining a channel creates a channel", function () {
    var join = sinon.spy();
    stub('tribe/types/Channel', function () {
        this.join = join;
    });
    require('tribe/server/channels').join('test');
    ok(join.calledOnce);
});

test("broadcast is called on individual channels", function () {
    var broadcast = sinon.spy();
    stub('tribe/types/Channel', function () {
        this.join = sinon.spy();
        this.broadcast = broadcast;
    });
    var channels = require('tribe/server/channels');
    channels.join('test');
    channels.broadcast({ channelId: 'test' });
    ok(broadcast.calledOnce);
});

test("empty channels are removed", function () {
    var broadcast = sinon.spy();
    stub('tribe/types/Channel', function () {
        this.join = sinon.spy();
        this.leave = sinon.spy();
        this.broadcast = broadcast;
        this.clients = [];
    });
    var channels = require('tribe/server/channels');
    channels.join('test');
    channels.broadcast({ channelId: 'test' });
    channels.leave('test');
    channels.broadcast({ channelId: 'test' });
    ok(broadcast.calledOnce);
});