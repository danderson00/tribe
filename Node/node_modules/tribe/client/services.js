T.services = function (name) {
    return {
        invoke: function () {
            return $.get('Services', { name: name, args: Array.prototype.splice.call(arguments, 0) })
                .fail(function (response) {
                    T.logger.error(response.responseText);
                });
        }
    };
};