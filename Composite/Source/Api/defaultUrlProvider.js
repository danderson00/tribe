T.options.defaultUrlProvider = {
    urlDataFrom: function(paneOptions) {
        return paneOptions && { url: '#' + $.param(paneOptions) };
    },
    paneOptionsFrom: function(url) {
        return url && T.Utils.deparam(url.substr(1));
    }
};