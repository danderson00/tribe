(function () {
    // This is a modified version of modules from the YUI Library - 
    // http://yuilibrary.com/yui/docs/api/files/querystring_js_querystring-stringify.js.html
    // Either it should be rewritten or attribution and licensing be available here and on the website like in http://yuilibrary.com/license/

    T.Utils.Querystring = T.Utils.Querystring || {};

    var escape = encodeURIComponent;

    T.Utils.Querystring.stringify = function (source, options) {
        return stringify(source, options);
    };

    function stringify(source, options, name, stack) {
        options = options || {};
        stack = stack || [];
        var begin, end, i, l, n, s;
        var sep = options.seperator || "&";
        var eq = options.eqSymbol || "=";
        var arrayKey = options.arrayKey !== false;

        if (source === null || source === undefined || source.constructor === Function)
            return name ? escape(name) + eq : '';

        if (source.constructor === Boolean || Object.prototype.toString.call(source) === '[object Boolean]')
            source = +source;

        if (!isNaN(source) || source.constructor === String)
            return escape(name) + eq + escape(source);

        if ($.isArray(source)) {
            s = [];
            name = arrayKey ? name + '[]' : name;
            for (i = 0, l = source.length; i < l; i++) {
                s.push(stringify(source[i], options, name, stack));
            }

            return s.join(sep);
        }
        
        // now we know it's an object.
        // Check for cyclical references in nested objects
        for (i = stack.length - 1; i >= 0; --i)
            if (stack[i] === source)
                throw new Error("T.Utils.Querystring.stringify: cyclical reference");

        stack.push(source);
        s = [];
        begin = name ? name + '[' : '';
        end = name ? ']' : '';
        for (i in source) {
            if (source.hasOwnProperty(i)) {
                n = begin + i + end;
                s.push(stringify(source[i], options, n, stack));
            }
        }

        stack.pop();
        s = s.join(sep);
        if (!s && name)
            return name + "=";

        return s;
    };
})();
