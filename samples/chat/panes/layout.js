require('tribe').register.model(function (pane) {
    var self = this;

    this.roomName = ko.observable('test');

    this.join = function () {
        T.appendNode('.rooms', { path: 'room', data: { name: self.roomName() } });
    };
})