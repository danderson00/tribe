var utils = require('./utils');

module.exports = {
    sync: false,
    handleExceptions: true,
    exceptionHandler: function(e, envelope) {
        typeof(console) !== 'undefined' && console.log("Exception occurred in subscriber to '" + envelope.topic + "': " + utils.errorDetails(e));
    }
};