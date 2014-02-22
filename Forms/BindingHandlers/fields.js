(function () {
    addBindingHandler('display');
    addBindingHandler('text');
    addBindingHandler('date');
    addBindingHandler('password');
    addBindingHandler('select');
    addBindingHandler('radio');
    addBindingHandler('boolean');

    function addBindingHandler(name) {
        ko.bindingHandlers[name + 'Field'] = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var options = T.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);
                if (bindingContext.__factory)
                    options.target = viewModel;
                TF.render(name, element, options);
                return { controlsDescendantBindings: true };
            }
        };
    }
})();