Reference.PubSub.Saga = {
    name: 'Tribe.PubSub.Saga',
    description: 'Manages a long running process by maintaining state and handling specific messages.',
    constructor: {
        arguments: [
            { name: 'definition', type: 'Object | Constructor', description: 'The object that contains the Saga definition or its constructor.' },
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
            returns: 'Tribe.PubSub.Saga'
        },
        {
            name: 'startChild',
            description: 'Starts a new saga. The lifetime of the new saga is bound to the current saga.',
            arguments: [
                { name: 'child', type: 'Object | Constructor', description: 'The object that contains the Saga definition or its constructor.' },
                { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
            ],
            returns: 'Tribe.PubSub.Saga'
        },
        {
            name: 'end',
            description: 'Unsubscribes message handlers for this and all child sagas.',
            arguments: [
                { name: 'data', type: 'Any', description: 'Data that is passed to the onend handler.' }
            ],
            returns: 'Tribe.PubSub.Saga'
        }
    ],
    properties: [
        { name: 'pubsub', type: 'Tribe.PubSub', description: 'The PubSub instance used for subscriptions.' },
        { name: 'children', type: '[TC.Types.Saga]', description: 'An array of sagas added through handler definitions or startChild.' }
    ],
    Definition: {
        arguments: [
            { Argument: 'saga', Type: 'TC.Types.Flow', Description: 'The Saga object that is consuming the definition.' },
            { Argument: 'args, ...', Type: 'Any', Description: 'The additional arguments that were passed to the Saga constructor.' }
        ],
        properties: [
            { Argument: 'handles', Type: 'Object', Description: 'A hashtable pairing message topics with handler functions. Can be nested.' },
            { Argument: 'endsChildrenExplicitly', Type: 'Boolean', Description: 'Setting to true causes child sagas to remain active if a message is received on the parent saga.' }
        ]
    }
};