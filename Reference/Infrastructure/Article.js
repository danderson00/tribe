Article = {
    show: function (section, topic) {
        return function () {
            TC.nodeFor('.content').pane.pubsub.publish('article.show', { section: section, topic: topic });
        };
    }
};