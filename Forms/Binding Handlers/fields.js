(function () {
    addBindingHandler('display');
    addBindingHandler('textField');
    addBindingHandler('dateField');
    addBindingHandler('passwordField');
    addBindingHandler('selectField');
    addBindingHandler('radioField');
    addBindingHandler('booleanField');

    ko.bindingHandlers.field = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var properties = valueAccessor();
            renderFieldTemplate(properties.type + 'Field', element, function () { return properties.value; }, valueAccessor, viewModel, bindingContext);
        }
    };

    function addBindingHandler(name) {
        ko.bindingHandlers[name] = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                renderFieldTemplate(name, element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
                return { controlsDescendantBindings: true };
            }
        };
    }

    function renderFieldTemplate(templateName, element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var data = allBindingsAccessor();
        data.value = valueAccessor();
        if (!ko.isObservable(data.value) && _.isFunction(data.value))
            data.value = data.value();

        var innerBindingContext = bindingContext.extend(data);
        ko.applyBindingsToDescendants(innerBindingContext, element);

        TF.renderTemplate(templateName, element);
        
        for (var i = 0; i < element.children.length; i++)
            ko.applyBindings(data, element.children[i]);
            
        var inputs = $(element).find('input');
        setIdAttribute();
        setFocus();
        clickFirstButtonOnEnterKey();

        // this is a bit of a hack
        function setFocus() {
            if (data.isDefault) // && !Configuration.mobile())
                setTimeout(function () {
                    inputs.focus();
                }, 100);
        }

        function clickFirstButtonOnEnterKey() {
            if (viewModel.__node)
                inputs.keyup(function (event) {
                    if (event.which === 13) {
                        $(event.target).change().blur();
                        var clickTarget = $(element).closest('.form').find('button:eq(0)');
                        if(clickTarget.length === 0 && viewModel.__node)
                            clickTarget = $(viewModel.__node.pane.element).find('button:eq(0)');
                        clickTarget.click();
                    }
                });
        }

        // it would be nicer if we could use the attr { id: id } binding in knockout, but the jQuery UI datepicker sets the id of elements, the attr binding then resets it.
        function setIdAttribute() {
            inputs.eq(0).attr('id', data.id);
        }
    };
})();