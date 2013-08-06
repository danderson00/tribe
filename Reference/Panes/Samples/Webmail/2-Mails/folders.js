TC.registerModel(function (pane) {
    var self = this;
    
    this.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    this.selectedFolder = ko.observable(pane.data.folder);

    // We've added a separate click handler to navigate
    // when a folder is selected.
    this.selectFolder = function (folder) {
        self.selectedFolder(folder);
        pane.navigate('mails', { folder: folder });
    };
});