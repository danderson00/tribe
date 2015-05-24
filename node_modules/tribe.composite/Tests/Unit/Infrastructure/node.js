Test.Unit.node = function () {
    var pane = Test.pane();
    return {
        pane: pane,
        path: pane.path,
        children: [],
        nodeForPath: function() { return this; }
    };
};