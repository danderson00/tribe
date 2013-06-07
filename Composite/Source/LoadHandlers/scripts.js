TC.LoadHandlers.js = function (url, resourcePath, context) {
    return $.ajax({
        url: url,
        dataType: 'text',
        async: !context.options.synchronous,
        cache: false,
        success: executeLoadedScripts
    });

    function executeLoadedScripts(scripts) {
        if (shouldSplit(scripts)) {
            var split = splitScripts(scripts);

            if (split === null)
                executeScript(appendSourceUrl(scripts));
            else
                for (var i = 0; i < split.length; i++)
                    executeScript(split[i]);

        } else
            executeScript(appendSourceUrl(scripts));

        TC.logger.debug('Loaded script from ' + url);
    }
    
    function executeScript(script) {
        TC.scriptEnvironment = {
            url: url,
            resourcePath: resourcePath,
            context: context
        };

        TC.Utils.try($.globalEval, [script], context.options.handleExceptions,
            'An error occurred executing script loaded from ' + url + (resourcePath ? ' for resource ' + resourcePath : ''));

        delete TC.scriptEnvironment;
    }

    function appendSourceUrl(script) {
        return script + '\n//@ sourceURL=' + url.replace(/ /g, "_");
    }
    
    function splitScripts(script) {
        return script.match(/(.*(\r|\n))*?(.*\/{2}\@ sourceURL.*)/g);
    }

    function shouldSplit(script) {
        if (context.options.splitScripts !== true) return false;
        var tagMatches = script.match("(//@ sourceURL=)");
        return tagMatches && tagMatches.length > 1;
    }
};