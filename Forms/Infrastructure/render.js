TF.render = function (name, element, options) {
    if (!options || !options.hasOwnProperty('value')) throw new Error('You must provide at least a value property on the options object');
    
    element = $(element)[0];
    if (options.target) resolveTargetProperty();
    
    bind();
    fieldSpecificSetup();

    var input = $(element).find('input:eq(0)');
    if (options.id) setIdAttribute();
    if (options.isDefault) setFocus();

    function resolveTargetProperty() {
        var defaultValue = ko.observable(options.defaultValue).extend(options.validate);
        options.value = TF.Utils.evaluateProperty(options.target, options.value, defaultValue);
    }

    function bind() {
        $.each(TF.renderTemplate(name, element), function (index, child) {
            ko.applyBindings(options, child);
        });
    }

    // yeh, this is pretty nasty... If more code is added here, this should be refactored.
    function fieldSpecificSetup() {
        switch (name) {
            case 'date':
                $('.datePicker').lwDatepicker({ parseDate: TF.Dates.tryParseDate, formatDate: TF.Dates.formatDate, autoHideAfterClick: true });
                break;
        }
    }

    function setFocus() {
        setTimeout(function () {
            input.focus();
        }, 100);
    }

    function setIdAttribute() {
        input.attr('id', options.id);
    }
};
