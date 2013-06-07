Tribe.PubSub.prototype.joinChannel = function(channelId, replayOrOptions) {
    TMH.joinChannel(channelId, replayOrOptions);
};

Tribe.PubSub.Lifetime.prototype.joinChannel = function (channelId, replayOrOptions) {
    var endLifetime = this.end;
    var channel = TMH.joinChannel(channelId, replayOrOptions);

    this.end = function() {
        channel.leave();
        endLifetime();
    };
};