(function () {
    // This is a modified version of modules from the YUI Library - 
    // http://yuilibrary.com/yui/docs/api/files/querystring_js_querystring-parse.js.html
    // Either it should be rewritten or attribution and licensing be available here and on the website like in http://yuilibrary.com/license/

    TC.Utils.Querystring = TC.Utils.Querystring || {};

    TC.Utils.Querystring.parse = function (source, seperator, eqSymbol) {
        stripLeadIn();
        
        return TC.Utils.reduce(
            TC.Utils.map(
                source.split(seperator || "&"),
                pieceParser(eqSymbol || "=")
            ),
            {},
            mergeParams
        );

        function stripLeadIn() {
            if(source.length > 0 && source[0] === '?')
                source = source.substring(1);
        }
    };
    
    function unescape(s) {
        return decodeURIComponent(s.replace(/\+/g, ' '));
    };

    function pieceParser(eq) {
        return function parsePiece(key, val) {

            var sliced, numVal, head, tail, ret;

            if (arguments.length === 2) {
                // key=val, called from the map/reduce
                key = key.split(eq);
                return parsePiece(
                    unescape(key.shift()),
                    unescape(key.join(eq)),
                    true
                );
            }
            
            key = key.replace(/^\s+|\s+$/g, '');
            if (val.constructor === String) {
                val = val.replace(/^\s+|\s+$/g, '');
                // convert numerals to numbers
                if (!isNaN(val)) {
                    numVal = +val;
                    if (val === numVal.toString(10)) {
                        val = numVal;
                    }
                }
            }
            
            sliced = /(.*)\[([^\]]*)\]$/.exec(key);
            if (!sliced) {
                ret = {};
                if (key)
                    ret[key] = val;
                return ret;
            }
            
            // ["foo[][bar][][baz]", "foo[][bar][]", "baz"]
            tail = sliced[2];
            head = sliced[1];

            // array: key[]=val
            if (!tail)
                return parsePiece(head, [val], true);

            // object: key[subkey]=val
            ret = {};
            ret[tail] = val;
            return parsePiece(head, ret, true);
        };
    }

    // the reducer function that merges each query piece together into one set of params
    function mergeParams(params, addition) {
        return (
            // if it's uncontested, then just return the addition.
            (!params) ? addition
            // if the existing value is an array, then concat it.
            : ($.isArray(params)) ? params.concat(addition)
            // if the existing value is not an array, and either are not objects, arrayify it.
            : (!$.isPlainObject(params) || !$.isPlainObject(addition)) ? [params].concat(addition)
            // else merge them as objects, which is a little more complex
            : mergeObjects(params, addition)
        );
    }

    // Merge two *objects* together. If this is called, we've already ruled
    // out the simple cases, and need to do the for-in business.
    function mergeObjects(params, addition) {
        for (var i in addition)
            if (i && addition.hasOwnProperty(i))
                params[i] = mergeParams(params[i], addition[i]);

        return params;
    }
})();
