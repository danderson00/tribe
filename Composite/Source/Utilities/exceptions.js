TC.Utils.tryCatch = function(func, args, handleExceptions, message) {
    if (handleExceptions)
        try {
            func.apply(func, args);
        } catch (ex) {
            TC.logger.error(message, ex);
        }
    else
        func.apply(func, args);
};