ko.bindingHandlers.colspan = {
    update: function (element, valueAccessor) {
        $(element).attr('colspan', valueAccessor());
    }
};