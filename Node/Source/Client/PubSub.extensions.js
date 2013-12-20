Tribe.PubSub.prototype.connect = function () {
    
};

Tribe.PubSub.Channel.prototype.connect = function (topics) {
    var self = this;
    
    T.hub.join(this.id);
    this.subscribe(topics || '*', function(data, envelope) {
        T.hub.publish(envelope);
    });

    var end = this.end;
    this.end = function () {
        T.hub.leave(self.channelId);
        end();
    };
    
    return this;
};