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
        var data = TF.Utils.normaliseBindings(valueAccessor, allBindingsAccessor);
        if(bindingContext.__create) resolveStringValue();

        var innerBindingContext = bindingContext.extend(data);
        ko.applyBindingsToDescendants(innerBindingContext, element);

        TF.renderTemplate(templateName, element);
        fieldSpecificSetup();
        ko.applyBindingsToDescendants(data, element);
            
        var inputs = $(element).find('input');
        setIdAttribute();
        setFocus();
        clickFirstButtonOnEnterKey();

        function resolveStringValue() {
            if (data.value.constructor === String) {
                var defaultValue;
                if (bindingContext.__create) defaultValue = ko.observable(data.defaultValue).extend(data.validate);
                var evaluatedValue = TF.Utils.evaluateProperty(viewModel, data.value, defaultValue);
                data.value = evaluatedValue;
            }
        }

        // this is a bit of a hack
        function setFocus() {
            if (data.isDefault)
                setTimeout(function () {
                    inputs.focus();
                }, 100);
        }

        // this has got to work outside of Tribe...
        function clickFirstButtonOnEnterKey() {
            if (viewModel && viewModel.__node)
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
        
        // yeh, this is pretty nasty... If more code is added here, this should be refactored.
        function fieldSpecificSetup() {
            switch(templateName) {
                case 'dateField':
                    $('.datePicker').lwDatepicker({ parseDate: TF.Dates.tryParseDate, formatDate: TF.Dates.formatDate, autoHideAfterClick: true });
                    break;
            }
        }
    };
})();