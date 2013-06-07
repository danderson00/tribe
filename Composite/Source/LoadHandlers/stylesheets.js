TC.LoadHandlers.css = function (url, resourcePath, context) {
    return $.ajax({
        url: url,
        dataType: 'text',
        async: !context.options.synchronous,
        cache: false,
        success: renderStylesheet
    });

    function renderStylesheet(stylesheet) {
        $('<style/>')
            .attr('id', resourcePath ? 'style-' + TC.Path(resourcePath).asMarkupIdentifier() : null)
            .attr('class', '__tribe')
            .text(stylesheet)
            .appendTo('head');
    }
};