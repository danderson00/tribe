TC.registerModel(function (pane) {
    this.panePath = panePath(pane.data);

    pane.pubsub.subscribe('article.show', function (article) {
        $(pane.element).css({ 'position': 'absolute', 'width': '100%' });
        pane.navigate({ path: '/Interface/content', data: article });
    });
    
    function panePath(article) {
        return '/Content/' + article.section + '/' + article.topic;
    }
});