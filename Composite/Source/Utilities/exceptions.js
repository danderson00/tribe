TC.Utils.tryCatch = function(func, args, handleExceptions, message) {
    if (handleExceptions)
        try {
            func.apply(this, args || []);
        } catch (ex) {
            TC.logger.error(message, ex);
        }
    else
        func.apply(this, args || []);
};