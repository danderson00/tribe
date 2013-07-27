TC.registerModel(function(pane) {
    this.f = pane.data;

    this.argumentNames = TC.Utils.pluck(pane.data.arguments, 'name').join(', ');
});