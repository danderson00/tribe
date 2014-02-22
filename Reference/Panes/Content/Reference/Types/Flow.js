Reference.Types.Flow = {
    name: 'T.Types.Flow',
    description: 'Manages a navigation flow by maintaining state and handling specific messages.',
    constructor: {
        arguments: [
            { name: 'navigationSource', type: 'T.Types.Pane | T.Types.Node', description: 'The flow attaches to the navigation node of the pane or node specified.' },
            { name: 'definition', type: 'Object | Constructor', description: 'The object that contains the Flow definition or its constructor.' },
            { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
        ]
    },
    functions: [
        {
            name: 'start',
            description: 'Subscribes provided message handlers to messages published on the pane\'s pubsub engine.',
            arguments: [
                { name: 'data', type: 'Constructor', description: 'Data that is passed to the onstart handler.' }
            ],
            returns: 'T.Types.Flow'
        },
        {
            name: 'startChild',
            description: 'Starts a new saga. The lifetime of the new saga is bound to the current saga.',
            arguments: [
                { name: 'definition', type: 'Constructor', description: 'The constructor for the object that contains the Flow definition.' },
                { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
            ],
            returns: 'T.Types.Flow'
        },
        {
            name: 'end',
            description: 'Unsubscribes message handlers for this and all child sagas.',
            arguments: [
                { name: 'data', type: 'Constructor', description: 'Data that is passed to the onend handler.' }
            ],
            returns: 'T.Types.Flow'
        },
        {
            name: 'startSaga',
            description: 'Creates a Saga that is bound to the flow\'s lifetime.',
            arguments: [
                { name: 'definition', type: 'Object | Constructor', description: 'The object that contains the Saga definition or its constructor.' },
                { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
            ],
            returns: 'Tribe.PubSub.Saga'
        },
        {
            name: 'navigate',
            description: 'Perform a navigation operation on the stored navigation node.',
            arguments: [
                { name: 'pathOrOptions', type: 'String | Object', description: 'An object containing path and data properties, or the path to the target pane.' },
                { name: 'data', type: 'Any', description: 'Data to pass to the target pane.' }
            ],
            returns: 'undefined'
        }
    ],
    helpers: [
        {
            name: 'to',
            description: 'Navigate to the specified pane when the specified message is received.',
            arguments: [
                { name: 'pathOrOptions', type: 'String | Object', description: 'An object containing path and data properties, or the path to the target pane.' },
                { name: 'data', type: 'Any', description: 'Data to pass to the target pane.' }
            ],
            returns: 'function () { }'
        },
        {
            name: 'endsAt',
            description: 'Navigate to the specified pane and end the flow when the specified message is received.',
            arguments: [
                { name: 'pathOrOptions', type: 'String | Object', description: 'An object containing path and data properties, or the path to the target pane.' },
                { name: 'data', type: 'Any', description: 'Data to pass to the target pane.' }
            ],
            returns: 'function () { }'
        },
        {
            name: 'start',
            description: 'Start a child flow when the specified message is received.',
            arguments: [
                { name: 'flow', type: 'Object | Constructor', description: 'The object that contains the Flow definition or its constructor.' },
                { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
            ],
            returns: 'function () { }'
        }
    ],
    properties: [
        { name: 'node', type: 'T.Types.Node', description: 'The node being used for navigation.' },
        { name: 'pubsub', type: 'Tribe.PubSub', description: 'The PubSub instance used for subscriptions.' },
        { name: 'saga', type: 'Tribe.PubSub.Saga', description: 'The underlying Saga instance.' },
        { name: 'sagas', type: '[T.Types.Saga]', description: 'Array of Sagas started with the startSaga function.' }
    ],
    Definition: {
        arguments: [
            { Argument: 'flow', Type: 'T.Types.Flow', Description: 'The Flow object that is consuming the definition.' },
            { Argument: 'args, ...', Type: 'Any', Description: 'The additional arguments that were passed to the Flow constructor.' }
        ],
        properties: [
            { Argument: 'handles', Type: 'Object', Description: 'A hashtable pairing message topics with handler functions. Can be nested.' },
            { Argument: 'endsChildrenExplicitly', Type: 'Boolean', Description: 'Setting to true causes child flows to remain active if a message is received on the parent flow.' }
        ]
    }
};