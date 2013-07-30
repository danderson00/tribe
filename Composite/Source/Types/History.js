TC.Types.History = function (history) {
    var currentState = 0;
    history.replaceState(currentState, window.title);

    var popActions = {
        raiseEvent: function (e) {
            TC.Utils.raiseDocumentEvent('browser.go', { count: (e.state - currentState) });
            currentState = e.state;
        },
        updateStack: function(e) {
            currentState = e.state;
            currentAction = popActions.raiseEvent;
        }
    };
    var currentAction = popActions.raiseEvent;

    window.addEventListener('popstate', executeCurrentAction);

    function executeCurrentAction(e) {
        if (e.state !== null) currentAction(e);
    }

    this.navigate = function (urlOptions) {
        urlOptions = urlOptions || {};
        history.pushState(++currentState, urlOptions.title, urlOptions.url);
    };

    this.go = function(frameCount) {
        history.go(frameCount);
    };

    this.update = function(frameCount) {
        currentAction = popActions.updateStack;
        history.go(frameCount);
    };

    this.dispose = function () {
        window.removeEventListener('popstate', executeCurrentAction);
    };
};
TC.history = new TC.Types.History(window.history);