TC.Events.createModel = function (pane, context) {
    var definition = context.models[pane.path];
    var model = definition && definition.constructor ?
        new definition.constructor(pane) :
        { pane: pane, data: pane.data };

    TC.Utils.embedState(model, context, pane.node);

    pane.model = model;
};