TC.registerModel(function (pane) {
    var self = this;
    var data = pane.data || {};
    var rootPane = data.rootPane || 'layout';

    // this is a hack to make samples navigate as if they were the root pane
    pane.node.root = pane.node;

    this.samplePane = rootPane.constructor === String ? 
        '/Samples/' + data.name + '/' + rootPane : rootPane;
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