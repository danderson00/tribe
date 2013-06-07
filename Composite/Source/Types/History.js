TC.Types.History = function (history) {
    var ids = TC.Utils.idGenerator();
    var node;
    var currentState;

    $(document).on('navigating', documentNavigating);
    window.onpopstate = popState;
    
    function documentNavigating(e, data) {
        if (node !== data.node) {
            node = data.node;
            pushState({ path: node.pane.path, data: node.pane.data }, true);
        }
        pushState(data.options);
    }
    
    function pushState(options, replace) {
        var state = {
            id: ids.next(),
            options: JSON.stringify(options)
        };
        currentState = state;
        replace ? history.replaceState(state, '') : history.pushState(state, '');
    }
    
    function popState(e) {
        currentState = e.state;
        //var reverse = state.id < currentState.id;
        if (currentState) {
            node.transitionTo(JSON.parse(currentState.options), null, true);
        }
    }

    this.dispose = function() {
        $(document).off('navigating', documentNavigating);
        $(document).off('popstate', popState);
    };
};