T.Types.Pane = function (options) {
    T.Utils.inheritOptions(options, this, ['path', 'data', 'element', 'transition', 'reverseTransitionIn', 'handlesNavigation', 'pubsub', 'id', 'skipPath']);

    // events we are interested in hooking in to - this could be done completely generically by the pipeline
    this.is = {
        rendered: $.Deferred(),
        disposed: $.Deferred()
    };    
};

T.Types.Pane.prototype.navigate = function (pathOrPane, data) {
    this.node && this.node.navigate(pathOrPane, data);
};

T.Types.Pane.prototype.navigateBack = function () {
    this.node && this.node.navigateBack();
};

T.Types.Pane.prototype.remove = function () {
    $(this.element).remove();
};

T.Types.Pane.prototype.dispose = function () {
    if (this.model && this.model.dispose)
        this.model.dispose();

    if (this.node) {
        delete this.node.pane;
        this.node.dispose();
    }

    if (this.element)
        T.Utils.cleanElement(this.element);
};

T.Types.Pane.prototype.inheritPathFrom = function (node) {
    node = node && node.nodeForPath();
    var pane = node && node.pane;    
    var path = T.Path(this.path);
    if (path.isAbsolute() || !pane)
        this.path = path.makeAbsolute().toString();
    else
        this.path = T.Path(pane.path).withoutFilename().combine(path).toString();
};

T.Types.Pane.prototype.find = function(selector) {
    return $(this.element).find(selector);
};

T.Types.Pane.prototype.startRender = function () {
    $(this.element).addClass('__rendering');
};

T.Types.Pane.prototype.endRender = function () {
    $(this.element).removeClass('__rendering');
};

T.Types.Pane.prototype.toString = function () {
    return "{ path: '" + this.path + "' }";
};

T.Types.Pane.prototype.startActor = function(path, args) {
    var actor = T.context().actors[path];
    this.pubsub.startActor.apply(this.pubsub, [actor.constructor].concat(Array.prototype.slice.call(arguments, 1)));
};

T.Types.Pane.prototype.startFlow = T.Types.Flow.startFlow;
