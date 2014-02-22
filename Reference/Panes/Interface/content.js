T.registerModel(function (pane) {
    this.panePath = panePath(pane.data);

    this.renderComplete = function() {
        pane.find('pre').each(function() {
            $(this).html(PR.prettyPrintOne($(this).html()));
        });
    };

    pane.pubsub.subscribe('article.show', function (article) {
        $(pane.element).css({ 'width': '100%' });
        pane.navigate({ path: '/Interface/content', data: article });
    });
    
    function panePath(article) {
        return '/Content/' + article.section + '/' + article.topic;
    }
});