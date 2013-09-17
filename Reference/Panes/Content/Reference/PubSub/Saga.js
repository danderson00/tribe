Reference.Types.Saga = {
    name: 'TC.Types.Saga',
    description: 'Manages a long running process by maintaining state and handling specific messages.',
    constructor: {
        arguments: [
            { name: 'pane', type: 'TC.Types.Pane', description: 'A Pane object to serve as the saga\'s "parent". The lifetime of the saga is tied to the pane.' },
            { name: 'handlers', type: 'Object', description: 'A hashtable of message handlers, keyed by the message topic.' },
            { name: 'initialData', type: 'Any', description: 'Initial value for the saga\'s data property.' }
        ]
    },
    functions: [
        {
            name: 'start',
            description: 'Subscribes provided message handlers to messages published on the pane\'s pubsub engine.',
            returns: 'undefined'
        },
        {
            name: 'startChild',
            description: 'Starts a new saga. The lifetime of the new saga is bound to the current saga.',
            arguments: [
                { name: 'childHandlers', type: 'Object', description: 'A hashtable of message handlers, keyed by the message topic.' },
                { name: 'childData', type: 'Any', description: 'Initial value for the saga\'s data property.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'end',
            description: 'Unsubscribes message handlers for this and all child sagas.',
            returns: 'undefined'
        }
    ],
    properties: [
        { name: 'pubsub', type: 'Tribe.PubSub' },
        { name: 'pane', type: 'TC.Types.Pane' },
        { name: 'data', type: 'Any' },
        { name: 'children', type: '[TC.Types.Saga]' }
    ]
};