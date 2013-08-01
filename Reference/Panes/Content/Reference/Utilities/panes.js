Reference.Utilities.Panes = [
    {
        name: 'TC.Utils.getPaneOptions',
        description: 'Normalise the passed value and merge the other options.',
        arguments: [{ name: 'value' }, { name: 'otherOptions' }]
    },
    {
        name: 'TC.Utils.bindPane',
        description: 'Load and bind the pane specified in paneOptions to the specified element and link it to the specified node.',
        arguments: [{ name: 'node' }, { name: 'element' }, { name: 'paneOptions' }, { name: 'context' }]
    },
    {
        name: 'TC.Utils.insertPaneAfter',
        description: 'As bindPane, but create a new DIV element and insert it after the specified target.',
        arguments: [{ name: 'node' }, { name: 'target' }, { name: 'paneOptions' }, { name: 'context' }]
    }
];