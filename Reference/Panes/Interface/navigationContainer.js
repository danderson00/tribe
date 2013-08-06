TC.registerModel(function (pane) {
    pane.node.skipPath = true;
    pane.node.root = pane.node;

    var currentFrame = 0;
    this.initialPane = pane.data.frames[currentFrame];
    this.atStart = ko.observable(true);
    this.atEnd = ko.observable(false);

    this.back = function() {
        pane.navigateBack();
        currentFrame--;
        this.atEnd(false);
        this.atStart(currentFrame === 0);
    };

    this.next = function() {
        pane.navigate(pane.data.frames[++currentFrame]);
        this.atEnd(currentFrame === pane.data.frames.length - 1);
        this.atStart(false);
    };
    
    
});