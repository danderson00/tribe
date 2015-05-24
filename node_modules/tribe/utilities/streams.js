var utils = require('tribe/utilities/files'),
    through = require('through'),
    _ = require('underscore');

module.exports = {
    // used with browserify, this takes a callback that accepts the file source and file info object
    // the file info object comes from the files argument with matching path property
    // transform is only executed if the file exists in files argument or argument is not provided
    throughTransform: function (callback, files) {
        return function (path) {
            var data = '';
            return through(write, end);

            function write(buf) {
                data += buf;
            }

            function end() {
                var file = _.findWhere(files, { path: path }) || { path: path };
                this.queue(callback(utils.stripBOM(data), file));
                this.queue(null);
            }
        }

    }
};