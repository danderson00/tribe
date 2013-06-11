(function () {
    TC.registerModel(function (pane) {
        var pubsub = pane.pubsub;
        var data = pane.data;

        this.gradientClass = data.gradientClass ? data.gradientClass : 'gradientGreen';
        this.text = data.text;
        this.buttons = $.map(data.buttons || [], function (button) {
            return {
                click: button.click ? button.click : null,
                text: button.text ? button.text : null,
                visible: button.visible !== undefined ? button.visible : true
            };
        });
    });
})();