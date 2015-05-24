module.exports = {
    rethrow: function (message) {
        return function (inner) {
            var error = new Error(message + (inner.message ? ' - ' + inner.message : ''));
            error.inner = inner;
            //log.error('Rethrowing:', error);
            throw error;
        };
    },
};