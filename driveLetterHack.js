﻿var path = require('path'),
    os = require('os');

// this is to work around the issue described in https://github.com/joyent/node/issues/7031
// it was causing the tribe/actors to be loaded twice and actors were being registered on an inaccessible instance
if (!path.resolve.IS_PATCHED && os.platform().match(/^win/)) {
    var old = path.resolve;

    path.resolve = function pathResolvePath() {
        var result = old.apply(path, arguments);
        return result[0].toLowerCase() + result.substr(1);
    };

    path.resolve.IS_PATCHED = true;
}