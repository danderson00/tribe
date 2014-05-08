var debugWindow;

module.exports = {
    open: function () {
        var deferred = $.Deferred();

        if (!debugWindow || debugWindow.closed) {
            debugWindow = window.open('http://' + window.location.hostname + ':' + module.exports.inspectorPort + '/debug?port=' + module.exports.debugPort, 'debugger');
            setTimeout(deferred.resolve, 1000);
        } else
            deferred.resolve();

        debugWindow.focus();
        return deferred;
    },
    debugPort: 5859,
    inspectorPort: 8080
};