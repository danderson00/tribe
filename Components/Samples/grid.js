T.registerModel(function(pane) {
    this.gridSource = [
        { string: 'Hello', first: 1, second: 4 },
        { string: 'World', first: 2, second: 3 }
    ];
    
    this.gridColumns = [
        { property: 'string', heading: 'String' },
        { grouping: 'Grouping', columns: [
            { property: 'first', heading: 'First' },
            { property: 'second', heading: 'Second' }
        ]}
    ];
});