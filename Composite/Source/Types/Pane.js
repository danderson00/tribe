TC.Types.Pane = function (options) {
    TC.Utils.inheritOptions(options, this, ['path', 'data', 'element', 'transition', 'reverseTransitionIn', 'handlesNavigation', 'pubsub', 'id', 'skipPath']);

    // events we are interested in hooking in to - this could be done completely generically by the pipeline
    this.is = {
        rendered: $.Deferred(),
        disposed: $.Deferred()
    };    
};

TC.Types.Pane.prototype.navigate = function (pathOrPane, data) {
    this.node && this.node.navigate(pathOrPane, data);
};

TC.Types.Pane.prototype.remove = function() {
    $(this.element).remove();
};

TC.Types.Pane.prototype.dispose = function () {
    if (this.model && this.model.dispose)
        this.model.dispose();

    if (this.node) {
        delete this.node.pane;
        this.node.dispose();
    }

    if (this.element)
        TC.Utils.cleanElement(this.element);
};

TC.Types.Pane.prototype.inheritPathFrom = function (node) {
    node = node && node.nodeForPath();
    var pane = node && node.pane;    
    var path = TC.Path(this.path);
    if (path.isAbsolute() || !pane)
        this.path = path.makeAbsolute().toString();
    else
        this.path = TC.Path(pane.path).withoutFilename().combine(path).toString();
};

TC.Types.Pane.prototype.find = function(selector) {
    return $(this.element).find(selector);
};

TC.Types.Pane.prototype.startRender = function () {
    $(this.element).addClass('__rendering');
};

TC.Types.Pane.prototype.endRender = function () {
    $(this.element).removeClass('__rendering');
};

TC.Types.Pane.prototype.toString = function () {
    return "{ path: '" + this.path + "' }";
};