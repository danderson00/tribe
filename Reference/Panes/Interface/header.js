TC.registerModel(function (pane) {
    this.showSection = function(section) {
        return function() {
            pane.pubsub.publish('article.show', { section: section, topic: 'index' });
        };
    };

    this.source = function() {

    };
});