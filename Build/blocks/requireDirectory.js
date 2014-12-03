﻿module.exports = function (path, recursive) {
    return function (context, build) {
        var utils = require('tribe/utilities');

        return utils.files.enumerateFiles(build.appPath.resolve(path), function (path, relative) {
            // this should be a filter on enumerateFiles
            if (path.substr(path.length - 3, 3) !== '.js')
                return;

            require('tribe').register.setContextPath(path, relative);

            // hack for https://github.com/joyent/node/issues/7806
            path = path.charAt(0).toLowerCase() + path.substring(1);
            require(path);

            //require(require.resolve(path));
        }, recursive);
    };
};