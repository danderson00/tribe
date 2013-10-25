TC.registerModel(function (pane) {
    var self = this;
    var currentSection;

    this.items = ko.observableArray();
    this.selectedTopic = ko.observable();
    this.selectedParent = ko.computed(function () {
        var topic = self.selectedTopic();
        if (!topic) return null;
        var index = topic.indexOf('/');
        return index == -1 ? topic :
            topic.substr(0, index);
    });

    this.showSection = function (item) {
        self.selectedTopic(item.topic);
    };

    this.showArticle = function (item) {
        self.selectedTopic(item.topic);
        pane.pubsub.publish('article.show', { section: currentSection, topic: item.topic });
    };

    // it would be nice to use the article.show message for this,
    // but that won't work with browser back and forward buttons
    TC.Utils.handleDocumentEvent('navigating', navigating);
    function navigating(e) {
        var data = e.eventData.options.data || {};
        updateCurrentArticle(data);
    }
    
    // this is to handle bookmarks / refresh
    // need to come up with a better way of doing this
    this.renderComplete = function() {
        updateCurrentArticle(pane.node.findNavigation().node.pane.data);
    };

    function updateCurrentArticle(data) {
        if (data.section && data.topic) {
            self.selectedTopic(data.topic);

            if (currentSection !== data.section) {
                currentSection = data.section;
                var items = mapNavigation(data.section);
                if (items.length > 0) {
                    self.items(items);
                    show();
                } else
                    hide();
            }
        }
    }

    function show() {
        if (!$('.navigation').is(':visible'))
            TC.transition('.navigation', 'slideRight')['in']();
    }

    function hide() {
        if ($('.navigation').is(':visible'))
            TC.transition('.navigation', 'slideLeft').out(false);
    }

    this.dispose = function () {
        window.removeEventListener('navigating', navigating);
    };

    // maps the cleaner API navigation structure into a structure suitable for data bindings. could be refactored out.
    function mapNavigation(section) {
        return TC.Utils.map(Navigation[section], function (item, key) {
            return {
                displayText: key,
                section: section,
                key: key,
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