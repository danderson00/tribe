TC.registerModel(function (pane) {
    var self = this;
    var currentSection;
    
    this.selectedParent = ko.observable();
    this.selectedItem = ko.observable();
    this.items = ko.observableArray();

    this.showArticleIndex = function (item) {
        self.selectedParent(item);
        self.selectedItem(item);
        pane.pubsub.publish('article.show', { section: currentSection, topic: item.topic });
    };

    this.showArticle = function(item) {
        self.selectedItem(item);
        pane.pubsub.publish('article.show', { section: currentSection, topic: item.topic });
    };

    pane.pubsub.subscribe('article.show', function (article) {
        if (currentSection !== article.section) {
            currentSection = article.section;
            self.items(mapNavigation(article.section));
            pane.pubsub.publish('ui.showLeftPanel', { show: self.items().length > 0 });
        }
    });
    
    // maps the cleaner API navigation structure into a structure suitable for data bindings. could be refactored out.
    function mapNavigation(section) {
        return TC.Utils.map(Navigation[section], function(item, key) {
            return {
                displayText: key,
                topic: key + '/index',
                items: mapChildItems(key, item)
            };
        });        
    }
    
    function mapChildItems(parentKey, container) {
        return TC.Utils.map(container, function (item, key) {
            return {
                displayText: key,
                topic: parentKey + '/' + item
            };
        });
    }
});