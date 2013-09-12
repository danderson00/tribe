ko.bindingHandlers.focus = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var context = viewModel.__context || bindingContext.$root.__context;
        if (context)
            $.when(context.renderOperation.promise).done(function () {
                setTimeout(function() {
                    $(element).focus();
                }, 100);
            });
    }
};