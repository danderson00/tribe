(function() {
    ko.bindingHandlers.foreachProperty = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            return ko.bindingHandlers.foreach.init(element, makeAccessor(mapToArray(valueAccessor())), allBindingsAccessor, viewModel, bindingContext);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            return ko.bindingHandlers.foreach.update(element, makeAccessor(mapToArray(valueAccessor())), allBindingsAccessor, viewModel, bindingContext);
        }
    };
    
    function makeAccessor(source) {
        return function() {
            return source;
        };
    }

    function mapToArray(source) {
        var result = [];
        for (var property in source)
            if (source.hasOwnProperty(property))
                // we don't want to modify the original object, extend it onto a new object
                result.push($.extend({ $key: property }, source[property]));
        return result;
    }
})();
