module.exports = {
    ensureTrailingSlash: function (path) {
        return path.charAt(path.length - 1) === '/' ? path : path + '/';
    },
    rethrow: function (message) {
        return function (inner) {
            var error = new Error(message);
            error.inner = inner;
            throw error;
        };
    },
    extractError: function (ex) {
        return ex && ex.constructor === String ?
            { message: ex } :
            {
                message: ex.message,
                name: ex.name,
                stack: ex.stack,
                inner: extractError(ex.inner)
            };
    },
    errorDetails: function (ex) {
        return ex && ex.constructor === String ? ex :
            ex.stack + (ex.inner ? '\n\n' + this.errorDetails(ex.inner) : '');
    }
};