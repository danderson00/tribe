TC.Types.Logger = function () {
    var logLevel = 0;
    var logger = 'console';

    var levels = {
        0: 'debug',
        1: 'info',
        2: 'warn',
        3: 'error',
        4: 'none'
    };

    this.debug = function (message) {
        log(0, message);
    };

    this.info = function (message) {
        log(1, message);
    };

    this.warn = function (message) {
        log(2, message);
    };

    this.error = function (message, error) {
        var logString;
        if (error && error.stack)
            logString = message + ' ' + error.stack;
        else if (error && error.message)
            logString = message + ' ' + error.message;
        else
            logString = message + ' ' + (error ? error : '');

        log(3, logString);
    };

    function log(level, message) {
        if(logLevel <= level)
            TC.Loggers[logger](levels[level], message);
    };

    this.setLogLevel = function (level) {
        $.each(levels, function(value, text) {
            if (level === text)
                logLevel = value;
        });
    };

    this.setLogger = function(newLogger) {
        logger = newLogger;
    };
};

TC.logger = new TC.Types.Logger();