TC.LoadHandlers.htm = function (url, resourcePath, context) {
    return $.ajax({
        url: url,
        dataType: 'html',
        async: !context.options.synchronous,
        cache: false,
        success: storeTemplate
    });

    function storeTemplate(template) {
        context.templates.store(template, resourcePath);
    }
};
TC.LoadHandlers.html = TC.LoadHandlers.htm;
