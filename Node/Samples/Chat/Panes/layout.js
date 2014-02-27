T.registerModel(function (pane) {
    var self = this;

    this.channel = ko.observable('chat');
    this.username = ko.observable('Anonymous');
    this.join = function () {
        T.appendNode('.channels', { path: 'chat', data: { channel: self.channel(), username: self.username() }});
    };
});