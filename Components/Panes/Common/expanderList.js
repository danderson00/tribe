(function () {
    T.registerModel(function (pane) {
        pane.node.skipPath = true;
        
        var pubsub = pane.pubsub;
        var data = pane.data;

        var self = this;
        
        this.expanders = data;

        this.renderComplete = function () {
            T.renderTooltips(self.tooltips, 'help', pane);
        };

        this.tooltips = {
            expanderList: {
                selector: '.expanderList',
                position: 'above',
                html: 'Click on any of these bars to expand the content'
            }
        };
    });
})();