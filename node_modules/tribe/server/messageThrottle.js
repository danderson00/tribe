// this is necessary to ensure messages are only broadcast to clients once
// subscription to multiple actors may produce overlap in subscriptions
// efficiency gains could be had by centralising where messages are 
// broadcast from, but this works for now

module.exports = {
    annotateEnvelope: function (envelope) {
        var recipients = {};

        // only attach functions to envelope to ensure nothing is serialised
        envelope.hasBeenBroadcastTo = function (clientId) {
            return recipients[clientId] === true;
        };

        envelope.addToBroadcastList = function (clientId) {
            recipients[clientId] = true;
        };
    }
}