(function () {
    ko.bindingHandlers.select = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            var value = valueAccessor();
            var bindings = allBindingsAccessor();
            var source = ko.utils.unwrapObservable(bindings.source);
            var displayList = bindings.property ?
                _.map(source, function(item) {
                    return item[bindings.property];
                }) : 
                source.slice(0);

            displayList.splice(0, 0, [bindings.initialText || 'Select...']);

            setTimeout(function() {
                TF.renderTemplate('/Templates/select.list', element);
                ko.applyBindings({ source: displayList, change: change }, element.children[0]);
            });
            
            function change(binding, event) {
                var index = $(event.target).find('option:selected').index();
                if(ko.isObservable(value))
                    value(index ? source[index - 1] : null);
            }
        }
    };

    ko.bindingHandlers.label = {
        update: function (element, valueAccessor) {
            $(element).attr('label', ko.utils.unwrapObservable(valueAccessor()));
        }
    };
})();