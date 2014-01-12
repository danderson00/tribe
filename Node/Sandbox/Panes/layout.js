TC.registerModel(function (pane) {
    var self = this;

    this.channel = ko.observable('chat');
    this.username = ko.observable('Anonymous');
    this.join = function () {
        TC.appendNode('.channels', { path: 'chat', data: { channel: self.channel(), username: self.username() }});
    };
});