T.registerModel(function (pane) {
    var self = this;

    this.content = ko.observable();
    this.tabs = T.map(pane.data.tabs, mapTab);

    this.renderComplete = function() {
        self.select(self.tabs[0]);
    };

    this.select = function (tab) {
        self.content(tab.content);
        setActive(tab);
        if (pane.data.tabSelected)
            pane.data.tabSelected(tab);
    };

    function mapTab(tab) {
        return {
            header: tab.header,
            content: tab.content,
            active: ko.observable(false)
        };
    }
    
    function setActive(activeTab) {
        T.each(self.tabs, function(tab) {
            tab.active(tab === activeTab);
        });
    }
});