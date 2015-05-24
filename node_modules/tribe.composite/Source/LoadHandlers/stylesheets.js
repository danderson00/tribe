T.LoadHandlers.css = function (url, resourcePath, context) {
    var supportsTextNodes = true;
    
    return $.ajax({
        url: url,
        dataType: 'text',
        async: !context.options.synchronous,
        cache: false,
        success: renderStylesheet
    });

    function renderStylesheet(stylesheet) {
        var element = document.getElementById('__tribeStyles');
        if (!element) {
            element = document.createElement('style');
            element.className = '__tribe';
            element.id = '__tribeStyles';
            document.getElementsByTagName('head')[0].appendChild(element);
        }

        if(supportsTextNodes)
            try {
                element.appendChild(document.createTextNode(stylesheet));
            } catch(ex) {
                supportsTextNodes = false;
            }

        if (!supportsTextNodes)
            if (element.styleSheet) {
                // using styleSheet.cssText is required for IE8 support
                // IE8 also has a limit on the number of <style/> elements, so append it to the same node
                element.styleSheet.cssText += stylesheet;
            } else throw new Error('Unable to append stylesheet for ' + resourcePath + ' to document.');
    }
};