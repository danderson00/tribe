TC.registerModel(function(pane) {
    
    this.personal = function () {
        pane.pubsub.publish('CC.startPersonal');
    };

    this.business = function () {
        pane.pubsub.publish('CC.startBusiness');
    };
});