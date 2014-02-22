T.registerModel(function(pane) {
    this.pane = pane.data.pane;

    this.highlightSyntax = function() {
        $('.sampleSource pre').syntaxHighlight();
    };
});