var articleUrlProvider = {
    urlDataFrom: function(options) {
        return {
            url: Navigation.isHome(options.data) ? '/' : '?section=' + encodeURI(options.data.section) + '&topic=' + encodeURI(options.data.topic)
        };
    },
    paneOptionsFrom: function (querystring) {
        if (querystring) {
            var options = TC.Utils.Querystring.parse(querystring);
            return {
                path: '/Interface/content',
                data: {
                    section: options.section,
                    topic: options.topic
                }
            };
        }
    }
};