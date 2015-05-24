var log = require('tribe.logger'),
    utils = require('tribe/utilities');

module.exports = {
    fail: function (req, res, status) {
        return function (error) {
            log.error('Error fetching path ' + req.path, error);
            if (options.debug)
                res.send(utils.text.htmlFrom(log.errorDetails(error)));
            res.status(status || 500).end();
        };
    }
};