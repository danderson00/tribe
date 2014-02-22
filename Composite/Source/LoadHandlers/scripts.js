T.LoadHandlers.js = function (url, resourcePath, context) {
    return $.ajax({
        url: url,
        dataType: 'text',
        async: !context.options.synchronous,
        cache: false,
        success: executeScript
    });

    function executeScript(script) {
        T.scriptEnvironment = {
            url: url,
            resourcePath: resourcePath,
            context: context
        };

        T.Utils.tryCatch($.globalEval, [appendSourceUrl(script)], context.options.handleExceptions,
            'An error occurred executing script loaded from ' + url + (resourcePath ? ' for resource ' + resourcePath : ''));

        delete T.scriptEnvironment;

        T.logger.debug('Loaded script from ' + url);
    }

    function appendSourceUrl(script) {
        return script + '\n//@ sourceURL=tribe://Application/' + url.replace(/ /g, "_");
    }    
};