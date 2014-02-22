Article = {
    show: function (section, topic) {
        return function () {
            T.nodeFor('.content').pane.pubsub.publish('article.show', { section: section, topic: topic });
        };
    }
};