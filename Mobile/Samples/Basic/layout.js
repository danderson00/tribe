T.registerModel(function (pane) {
    T.toolbar.title('Title!');
    T.toolbar.options([
        { text: 'test', func: function () { alert('test'); } },
        { text: 'test2', func: function () { alert('test2'); } }
    ]);

    this.listData = {
        items: [
            { id: 1, name: 'test1' },
            { id: 2, name: 'test2' },
            { id: 3, name: 'test3' }
        ],
        itemText: function (item) { return item.id + ': ' + item.name; },
        headerText: 'Select Item:',
        itemClick: function(item) {
        },
        cssClass: 'rounded'
    };

    this.overlay = function() {
        T.overlay('overlay');
    };

    this.toolbar = function () {
        T.toolbar.visible(!T.toolbar.visible());
    };

    this.navigate = function() {
        pane.navigate('navigate');
    };
});