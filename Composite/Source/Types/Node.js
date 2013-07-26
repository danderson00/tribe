TC.Types.Node = function (parent, pane) {
    this.parent = parent;
    this.children = [];
    this.root = parent ? parent.root : this;
    this.id = TC.Utils.getUniqueId();

    if (parent) parent.children.push(this);
    if (pane) this.setPane(pane);
};

TC.Types.Node.prototype.navigate = function (pathOrPane, data) {
    var paneOptions = TC.Utils.getPaneOptions(pathOrPane, { data: data });
    if (!TC.Path(paneOptions.path).isAbsolute())
        // this is duplicated in Pane.inheritPathFrom - the concept (relative paths inherit existing paths) needs to be clearer
        paneOptions.path = TC.Path(this.pane.path).withoutFilename().combine(paneOptions.path).toString();
    
    this.findNavigation().navigate(paneOptions);
};

TC.Types.Node.prototype.navigateBack = function () {
    this.findNavigation().go(-1);
};

TC.Types.Node.prototype.findNavigation = function() {
    if (this.defaultNavigation)
        return this.defaultNavigation;

    else if (this.navigation)
        return this.navigation;
        
    if (!this.parent) {
        this.navigation = new TC.Types.Navigation(this);
        return this.navigation;
    }

    return this.parent.findNavigation();
};

TC.Types.Node.prototype.transitionTo = function(paneOptions, transition, reverse) {
    TC.transition(this, transition, reverse).to(paneOptions);
};

TC.Types.Node.prototype.setPane = function (pane) {
    if (this.pane)
        this.pane.node = null;

    pane.node = this;
    this.pane = pane;
    this.skipPath = pane.skipPath;

    if (pane.handlesNavigation) {
        this.navigation = new TC.Types.Navigation(this, pane.handlesNavigation);
        
        // this sets this pane as the "default", accessible from panes outside the tree. First in best dressed.
        this.root.defaultNavigation = this.root.defaultNavigation || this.navigation;
    }

    pane.inheritPathFrom(this.parent);
};

TC.Types.Node.prototype.nodeForPath = function() {
    return this.skipPath && this.parent ? this.parent.nodeForPath() : this;
};

TC.Types.Node.prototype.dispose = function() {
    if (this.root.defaultNavigation === this.navigation)
        this.root.defaultNavigation = null;

    if (this.parent)
        TC.Utils.removeItem(this.parent.children, this);

    if (this.pane && this.pane.dispose) {
        delete this.pane.node;
        this.pane.dispose();
    }
};