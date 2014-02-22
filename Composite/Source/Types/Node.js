T.Types.Node = function (parent, pane) {
    this.parent = parent;
    this.children = [];
    this.root = parent ? parent.root : this;
    this.id = T.Utils.getUniqueId();

    if (parent) parent.children.push(this);
    if (pane) this.setPane(pane);
};

T.Types.Node.prototype.navigate = function (pathOrPane, data) {
    var paneOptions = T.Utils.getPaneOptions(pathOrPane, { data: data });
    if (!T.Path(paneOptions.path).isAbsolute())
        // this is duplicated in Pane.inheritPathFrom - the concept (relative paths inherit existing paths) needs to be clearer
        paneOptions.path = T.Path(this.nodeForPath().pane.path).withoutFilename().combine(paneOptions.path).toString();
    
    this.findNavigation().navigate(paneOptions);
};

T.Types.Node.prototype.navigateBack = function () {
    this.findNavigation().go(-1);
};

T.Types.Node.prototype.findNavigation = function() {
    if (this.defaultNavigation)
        return this.defaultNavigation;

    else if (this.navigation)
        return this.navigation;
        
    if (!this.parent) {
        this.navigation = new T.Types.Navigation(this);
        return this.navigation;
    }

    return this.parent.findNavigation();
};

T.Types.Node.prototype.transitionTo = function(paneOptions, transition, reverse) {
    T.transition(this, transition, reverse).to(paneOptions);
};

T.Types.Node.prototype.setPane = function (pane) {
    if (this.pane)
        this.pane.node = null;

    pane.node = this;
    this.pane = pane;
    this.skipPath = pane.skipPath;

    if (pane.handlesNavigation) {
        this.navigation = new T.Types.Navigation(this, pane.handlesNavigation);
        
        // this sets this pane as the "default", accessible from panes outside the tree. First in best dressed.
        this.root.defaultNavigation = this.root.defaultNavigation || this.navigation;
    }

    pane.inheritPathFrom(this.parent);
};

T.Types.Node.prototype.nodeForPath = function() {
    return this.skipPath && this.parent ? this.parent.nodeForPath() : this;
};

T.Types.Node.prototype.dispose = function() {
    if (this.root.defaultNavigation === this.navigation)
        this.root.defaultNavigation = null;

    if (this.parent)
        T.Utils.removeItem(this.parent.children, this);

    if (this.pane && this.pane.dispose) {
        delete this.pane.node;
        this.pane.dispose();
    }
};

T.Types.Node.prototype.startFlow = T.Types.Flow.startFlow;
