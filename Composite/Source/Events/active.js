TC.Events.active = function (pane, context) {
    return TC.Utils.elementDestroyed(pane.element);
};