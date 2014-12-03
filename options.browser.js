﻿module.exports = {
    apply: function (options) {
        for (var property in options)
            if (options.hasOwnProperty(property))
                module.exports[property] = options[property];
        return module.exports;
    },
    // these are just hard coded for now, we need a way of transporting relevant options to the client
    debugPort: 5858,
    inspectorPort: 8080
}