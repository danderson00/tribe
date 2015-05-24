T.Events.active = function (pane, context) {
    return T.Utils.elementDestroyed(pane.element);
};