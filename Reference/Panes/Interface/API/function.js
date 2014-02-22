T.registerModel(function(pane) {
    this.f = pane.data;

    this.argumentNames = T.Utils.pluck(pane.data.arguments, 'name').join(', ');
});