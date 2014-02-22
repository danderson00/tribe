T.registerModel(function (pane) {
    var self = this;

    this.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    this.selectedFolder = ko.observable(pane.data.folder);

    this.selectFolder = function (folder) {
        self.selectedFolder(folder);
        pane.navigate('mails', { folder: folder });
    };
});