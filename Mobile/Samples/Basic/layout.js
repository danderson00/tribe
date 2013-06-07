TC.registerModel(function (pane) {
    TC.toolbar.title('Title!');
    TC.toolbar.options([
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
        TC.overlay('/overlay');
    };

    this.toolbar = function () {
        TC.toolbar.visible(!TC.toolbar.visible());
    };
});