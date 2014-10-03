var watchr = require('watchr'),
    options = require('tribe/options'),
    log = require('tribe.logger');

module.exports = {
    watch: function (path, listeners) {
        var watcher;
        watch();

        return {
            suspend: function () {
                watcher.close();
            },
            resume: watch
        };

        function watch() {
            watcher = watchr.watch({
                path: path,
                listeners: { error: error, change: normaliseListeners() },
                catchupDelay: options.watcherDelay
            });
        }

        function error(ex) {
            log.error('An error occurred watching ' + path, ex);
        }

        function normaliseListeners() {
            if (typeof (listeners) === 'function')
                return listeners;
            return function (changeType, fullPath, currentStat, previousStat) {
                switch (changeType) {
                    case 'update':
                        listeners.update && listeners.update(fullPath, currentStat, previousStat);
                        listeners.createOrUpdate && listeners.createOrUpdate(fullPath, currentStat, previousStat);
                        break;
                    case 'create':
                        listeners.create && listeners.create(fullPath, currentStat, previousStat);
                        listeners.createOrUpdate && listeners.createOrUpdate(fullPath, currentStat, previousStat);
                        break;
                    case 'delete':
                        listeners.delete && listeners.delete(fullPath, currentStat, previousStat);
                }
            }
        }
    }
};
