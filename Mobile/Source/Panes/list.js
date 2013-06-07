TC.registerModel(function (pane) {
    var data = pane.data;
    this.items = data.items;
    this.click = data.itemClick || function () { };
    this.cssClass = data.cssClass;
    this.headerText = data.headerText;
    
    this.displayText = function (item) {
        if (item === null || item === undefined)
            return data.nullItemText;

        if (data.itemText) {
            if ($.isFunction(data.itemText))
                return data.itemText(item);
            else
                return item[data.itemText];
        } else {
            return item;
        }
    };
});