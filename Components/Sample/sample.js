TC.registerModel(function(pane) {
    this.panePath = pane.data.panePath;
    this.paneData = pane.data.paneData;
    this.paneDataJson = JSON.stringify(this.paneData);
});