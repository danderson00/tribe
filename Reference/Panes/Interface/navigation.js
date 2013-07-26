TC.registerModel(function (pane) {
    var self = this;
    var currentSection;

    this.selectedParent = ko.observable();
    this.selectedItem = ko.observable();
    this.items = ko.observableArray();

    this.showSection = function (item) {
        self.selectedParent(item);
        self.selectedItem(item);
    };

    this.showArticle = function(item) {
        self.selectedItem(item);
        pane.pubsub.publish('article.show', { section: currentSection, topic: item.topic });
    };

    window.addEventListener('navigating', navigating);
    function navigating(e) {
        var section = e.data.options.data && e.data.options.data.section;
        if (currentSection !== section) {
            currentSection = section;
            var items = mapNavigation(section);
            if (items.length > 0) {
                self.items(items);
                show();
            } else 
                hide();
        }
    }
    
    function show() {
        if (!$('.navigation').is(':visible'))
            TC.transition('.navigation', 'slideRight').in();
    }
    
    function hide() {
        if ($('.navigation').is(':visible'))
            TC.transition('.navigation', 'slideLeft').out(false);
    }
    
    this.dispose = function() {
        window.removeEventListener('navigating', navigating);
    };
    
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