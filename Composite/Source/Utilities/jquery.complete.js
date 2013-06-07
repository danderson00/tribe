(function ($) {
    $.complete = function (deferreds) {
        var wrappers = [];
        var deferred = $.Deferred();
        var resolve = false;

        if ($.isArray(deferreds))
            $.each(deferreds, wrapDeferred);
        else
            wrapDeferred(0, deferreds);

        $.when.apply($, wrappers).done(function() {
            resolve ?
                deferred.resolve() :
                deferred.reject();
        });

        return deferred;

        function wrapDeferred(index, original) {
            wrappers.push($.Deferred(function (thisDeferred) {
                $.when(original)
                    .done(function() {
                        resolve = true;
                    })
                    .always(function () {
                        thisDeferred.resolve();
                    });
            }));
        }
    };
})(jQuery);