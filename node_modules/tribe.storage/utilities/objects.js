module.exports = {
    indexOnProperty: function (property, source) {
        // really should use .reduce and polyfill if needed
        var result = {};
        for(var i = 0, l = source.length; i < l; i++)
            result[source[i][property]] = source[i];
        return result;
    }
}
