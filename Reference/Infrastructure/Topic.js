window.Topic = {
    createHelpers: function(pubsub) {
        Topic.show = function(section, topic) {
            return function() {
                pubsub.publish('article.show', { section: section, topic: topic });
            };
        };
    }
};