T.Events.renderComplete = function (pane, context) {
    $.when(
        T.transition(pane, pane.transition, pane.reverseTransitionIn)['in']())
     .done(executeRenderComplete);
    
    pane.endRender();

    function executeRenderComplete() {
        if (pane.model.renderComplete)
            pane.model.renderComplete();
        pane.is.rendered.resolve();
        T.Utils.raiseDocumentEvent('renderComplete', pane);
        context.renderOperation = new T.Types.Operation();
    }
};