TC.Types.Node = function (parent, pane) {
    this.parent = parent;
    this.children = [];
    this.root = parent ? parent.root : this;

    if (parent) parent.children.push(this);
    if (pane) this.setPane(pane);
};

TC.Types.Node.prototype.navigate = function (pathOrPane, data) {
    var paneOptions = TC.Utils.getPaneOptions(pathOrPane, { data: data });
    if (!TC.Path(paneOptions.path).isAbsolute())
        // this is duplicated in Pane.inheritPathFrom - the concept (relative paths inherit existing paths) needs to be clearer
        paneOptions.path = TC.Path(this.pane.path).withoutFilename().combine(paneOptions.path).toString();

    if (this.defaultNavigationNode && this.defaultNavigationNode.handlesNavigation)
        this.defaultNavigationNode.navigate(paneOptions);
    
    else if (this.handlesNavigation || !this.parent) {
        $(document).trigger('navigating', { node: this, options: paneOptions });
        this.transitionTo(paneOptions, this.handlesNavigation);
        
    } else
        this.parent.navigate(paneOptions);
};

TC.Types.Node.prototype.transitionTo = function(paneOptions, transition, reverse) {
    TC.transition(this, transition || this.handlesNavigation, reverse).to(paneOptions);
};

TC.Types.Node.prototype.setPane = function (pane) {
    if (this.pane)
        this.pane.node = null;

    pane.node = this;
    this.pane = pane;
    this.skipPath = pane.skipPath;

    if (pane.handlesNavigation) {
        this.handlesNavigation = pane.handlesNavigation;
        
        // this sets this pane as the "default", accessible from everywhere. 
        // It's not appropriate for multiple navigation panes, but we haven't tested for that anyway.
        this.root.defaultNavigationNode = this;
    }

    pane.inheritPathFrom(this.parent);
};

TC.Types.Node.prototype.nodeForPath = function() {
    return this.skipPath && this.parent ? this.parent.nodeForPath() : this;
};

TC.Types.Node.prototype.dispose = function() {
    if (this.parent)
        TC.Utils.removeItem(this.parent.children, this);
    if (this.pane && this.pane.dispose)
        this.pane.dispose();
};