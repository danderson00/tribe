Reference.Types.Node = {
    name: 'TC.Types.Node',
    description: 'A Node object is a placeholder for a pane within the UI structure. Nodes can be transitioned to display different panes using the navigate or transitionTo functions.',
    constructor: {
        arguments: [
            { name: 'parent', type: 'TC.Types.Node' },
            { name: 'pane', type: 'TC.Types.Pane' }
        ]
    },
    functions: [
        {
            name: 'navigate',
            description: 'Find the navigation node for the current node and transition it to the specified pane, updating the history stack.',
            arguments: [
                { name: 'pathOrOptions', type: 'String | Object', description: 'An object containing path and data properties, or the path to the target pane.' },
                { name: 'data', type: 'Any', description: 'Data to pass to the target pane.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'navigateBack',
            description: 'Find the navigation node for the current node and transition it to the previous pane in the history stack.',
            returns: 'undefined'
        },
        {
            name: 'findNavigation',
            description: 'Find the node that handles navigation for the current node. Usually the closest parent that has been marked with handlesNavigation, unless overridden.',
            returns: 'TC.Types.Navigation'
        },
        {
            name: 'transitionTo',
            description: 'Transition the pane for the current node to the specified pane.',
            arguments: [
                { name: 'paneOptions', type: 'Object', description: 'An object containined path and data properties.' },
                { name: 'transition', type: 'String', description: 'The transition to use.' },
                { name: 'reverse', type: 'Boolean', description: 'Use the reverse transition.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'setPane',
            description: 'Sets the pane on the current node.',
            arguments: [
                { name: 'pane', type: 'TC.Types.Pane' }
            ],
            returns: 'undefined'
        },
        {
            name: 'nodeForPath',
            description: 'Find the node to use for inheriting paths from.',
            returns: 'TC.Types.Node'
        },
        {
            name: 'dispose',
            description: 'Clean up resources used by the node.',
            returns: 'undefined'
        }
    ],
    properties: [
        {
            name: 'parent',
            type: 'TC.Types.Node'
        },
        {
            name: 'children',
            type: '[TC.Types.Node]'
        },
        {
            name: 'root',
            description: 'The root node of the current node tree.',
            type: 'TC.Types.Node'
        },
        {
            name: 'id',
            description: 'A unique numeric identifier for the current node.',
            type: 'Number'
        },
        {
            name: 'pane',
            type: 'TC.Types.Pane'
        },
        {
            name: 'navigation',
            description: 'The Navigation object for the current node, if any.',
            type: 'TC.Types.Navigation'
        },
        {
            name: 'defaultNavigation',
            description: 'The default Navigation object to use for the current node. Set on the root node so that all nodes in the tree can access the navigation node.',
            type: 'TC.Types.Node'
        }
    ]
};