(function (utils) {    
    utils.each = function (collection, iterator) {
        return $.each(collection || [], function (index, value) {
            return iterator(value, index);
        });
    };

    // jQuery map flattens returned arrays - we don't want this for grids
    utils.map = function (collection, iterator) {
        var result = [];
        utils.each(collection || [], function(value, index) {
            result.push(iterator(value, index));
        });
        return result;
    };

    utils.filter = function(array, iterator) {
        var result = [];
        $.each(array || [], function(index, value) {
            if (iterator(value, index))
                result.push(value);
        });
        return result;
    };
})(TC.Utils);