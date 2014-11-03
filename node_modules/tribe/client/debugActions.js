var options = require('tribe/options');

$(document).keypress(function (e) {
    if (e.which === 28) // ctrl-\
        debugWindow = window.open('http://' + window.location.hostname + ':' + options.inspectorPort + '/debug?port=' + options.debugPort, 'debugger');
});