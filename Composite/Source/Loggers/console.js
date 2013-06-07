TC.Loggers.console = function(level, message) {
    if (window.console && window.console.log)
        window.console.log(level.toUpperCase() + ': ' + message);
};