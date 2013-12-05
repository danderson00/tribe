TC.registerModel(function (pane) {
    var self = this;

    TMH.initialise(pane.pubsub);

    this.channelId = ko.observable();

    this.join = function() {
        TC.appendNode('.container', { path: 'chat', data: { channelId: self.channelId() } });
    };
});