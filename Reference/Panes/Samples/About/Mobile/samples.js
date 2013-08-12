TC.registerModel(function (pane) {
    TC.toolbar.title('Title!');
    
    TC.toolbar.options([
        { text: 'Option 1', func: function () { } },
        { text: 'Option 2', func: function () { } }
    ]);

    this.listData = {
        items: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' }
        ],
        itemText: function(item) {
             return item.id + ' - ' + item.name;
        },
        headerText: 'Select List',
        itemClick: function(item) { }
    };

    this.overlay = function() {
        TC.overlay('overlay');
    };

    this.navigate = function() {
        pane.navigate('navigate');
    };
});