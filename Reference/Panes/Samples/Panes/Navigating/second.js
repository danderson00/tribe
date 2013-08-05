TC.registerModel(function(pane) {
    this.back = function () {
        pane.navigateBack();
    };

    this.next = function () {
        pane.navigate('third');
    };
});