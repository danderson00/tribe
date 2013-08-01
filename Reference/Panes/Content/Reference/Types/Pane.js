Reference.Types.Pane = {
    name: 'TC.Types.Pane',
    description: 'A pane is a single user interface component within an application. It can consist of a HTML template, a JavaScript model and a CSS stylesheet. Panes can be nested within other panes.',
    constructor: {
        arguments: [
            { name: 'options', type: 'Object', description: 'Hashtable of options for the pane.' }
        ]
    },
    functions: [
        {
            name: 'navigate',
            description: 'Navigate the node containing the pane to the specified pane.',
            arguments: [
                { name: 'pathOrPane', type: 'String | Object', description: 'An object containing path and data properties, or the path to the target pane.' },
                { name: 'data', type: 'Any', description: 'Data to pass to the target pane.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'remove',
            description: 'Remove the pane from the DOM.',
            returns: 'undefined'
        },
        {
            name: 'find',
            description: 'Find elements contained within the pane.',
            arguments: [
                { name: 'selector', type: 'selector' }
            ],
            returns: 'jQuery'
        },
        {
            name: 'inheritPathFrom',
            description: 'If the pane\'s current path is relative, inherit the absolute path from the specified node.',
            arguments: [
                { name: 'node', type: 'TC.Types.Node' }
            ],
            returns: 'undefined'
        },
        {
            name: 'startRender',
            description: 'Adds a CSS class to identify the pane as currently being rendered.',
            returns: 'undefined'
        },
        {
            name: 'endRender',
            description: 'Remvoes the CSS class used to identify the pane as currently being rendered.',
            returns: 'undefined'
        },
        {
            name: 'dispose',
            description: 'Clean up resources used by the pane.',
            returns: 'undefined'
        },
        {
            name: 'toString',
            description: 'Returns a human readable identifier for the pane.',
            returns: 'String'
        }
    ],
    properties: [
        {
            name: 'path',
            type: 'String'
        },
        {
            name: 'data',
            type: 'Any'
        },
        {
            name: 'element',
            type: 'HTMLElement'
        },
        {
            name: 'transition',
            description: 'Transition to use when the pane is rendered and removed.',
            type: ''
        },
        {
            name: 'reverseTransitionIn',
            description: 'Use the reverse transition when rendering.',
            type: ''
        },
        {
            name: 'handlesNavigation',
            description: 'The pane has been marked as handling navigation.',
            type: ''
        },
        {
            name: 'pubsub',
            type: 'Tribe.PubSub'
        },
        {
            name: 'id',
            type: 'Any'
        },
        {
            name: 'skipPath',
            description: 'Skip this pane when determining the parent path to inherit from.',
            type: 'Boolean'
        },
        {
            name: 'is.rendered',
            description: '',
            type: ''
        },
        {
            name: 'is.disposed',
            description: '',
            type: ''
        },
    ]
};