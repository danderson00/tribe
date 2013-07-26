window.Article = {
    createHelpers: function(pubsub) {
        Article.show = function(section, topic) {
            return function() {
                pubsub.publish('article.show', { section: section, topic: topic });
            };
        };
    }
};