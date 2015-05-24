T.Events.createModel = function (pane, context) {
    var definition = context.models[pane.path],
        model = definition && definition.constructor
            ? new definition.constructor(pane)
            : {
                pane: pane,
                data: pane.data,
                navigate: navigate
            };

    T.Utils.embedState(model, context, pane.node);

    pane.model = model;

    function navigate(path, data) {
        return function () {
            pane.navigate(path, data);
        };
    }
};