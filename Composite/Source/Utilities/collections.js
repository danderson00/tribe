(function (utils) {    
    utils.map = function(collection, iterator) {
        return $.map(collection, iterator);
    };

    utils.filter = function(array, iterator) {
        var result = [];
        $.each(array, function(index, value) {
            if (iterator(value, index))
                result.push(value);
        });
        return result;
    };

    utils.each = function(collection, iterator) {
        return $.each(collection, function(index, value) {
            return iterator(value, index);
        });
    };
})(TC.Utils);