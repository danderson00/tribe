function articleUrlProvider(options) {
    return {
        url: isHome() ? '/' : '?section=' + encodeURI(options.data.section) + '&topic=' + encodeURI(options.data.topic)
    };
    
    function isHome() {
        return options.data.section === 'About' && options.data.topic === 'index';
    }
}