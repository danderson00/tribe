TC.registerModel(function (pane) {
    var self = this;

    this.samplePane = '/Samples/' + pane.data.name + '/' + (pane.data.rootPane || 'layout');
    this.files = Samples[pane.data.name];
    this.selectedFile = ko.observable(initialSelection());
    
    this.selectFile = function(file) {
        self.selectedFile(file);
        PR.prettyPrint();
    };

    this.renderComplete = function() {
        PR.prettyPrint();
    };
    
    function initialSelection() {
        if (!pane.data.initialFile)
            return self.files[0];
        for(var i = 0; i < self.files.length; i++)
            if (self.files[i].filename === pane.data.initialFile)
                return self.files[i];
    }
});