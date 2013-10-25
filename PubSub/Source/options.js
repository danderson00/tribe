window.Tribe.PubSub.options = {
    sync: false,
    handleExceptions: true,
    exceptionHandler: function(e, envelope) {
        window.console && console.log("Exception occurred in subscriber to '" + envelope.topic + "': " + e.message);
    }
};