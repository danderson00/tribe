T.Types.Pipeline = function (events, context) {
    this.execute = function (eventsToExecute, target) {
        var currentEvent = -1;
        var promise = $.Deferred();
        executeNextEvent();

        function executeNextEvent() {
            currentEvent++;
            if (currentEvent >= eventsToExecute.length) {
                promise.resolve();
                return;
            }

            var eventName = eventsToExecute[currentEvent];
            var thisEvent = events[eventName];

            if (!thisEvent) {
                T.logger.warn("No event defined for " + eventName);
                executeNextEvent();
                return;
            }

            // could possibly improve debugging in non-production scenarios by omitting the fail handler
            // using .done without a fail handler should mean the exception is unhandled, allowing it
            // to be caught by the debugger easily.
            // $.when(thisEvent(target, context))
            //     .done(executeNextEvent)
            //     .fail(handleFailure);

            // this handles promises returned from any other A+ compliant promise library
            var eventResult = thisEvent(target, context);
            if(eventResult && typeof eventResult.then === 'function') {
                eventResult.then(executeNextEvent, handleFailure);
            } else {
                try {
                    executeNextEvent();
                } catch(error) {
                    handleFailure(error);
                }
            }

            function handleFailure(error) {
                promise.reject(error);
                var targetDescription = target ? target.toString() : "empty target";
                T.logger.error("An error occurred in the '" + eventName + "' event for " + targetDescription, error);
            }
        }

        return promise;
    };
};
