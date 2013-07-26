function articleUrlProvider(options) {
    return {
        url: Navigation.isHome(options.data) ? '/' : '?section=' + encodeURI(options.data.section) + '&topic=' + encodeURI(options.data.topic)
    };
}