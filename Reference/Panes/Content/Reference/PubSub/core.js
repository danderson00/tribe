Reference.PubSub = {
    name: 'Tribe.PubSub',
    description: 'A fully featured publish / subscribe engine.',
    constructor: {
        arguments: [
            { name: 'options', type: 'Object', description: 'A hashtable of options. These are the same as and override those specified in global options.' }
        ]
    },
    functions: [
        {
            name: 'publish',
            description: 'Publish the specified message to the bus.',
            arguments: [
                { name: 'topicOrEnvelope', type: 'String | Object', description: 'A string message topic or a message envelope object.' },
                { name: 'data', type: 'Any', description: 'Data to attach to the message envelope.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'publishSync',
            description: 'Publish the specified message to the bus synchronously.',
            arguments: [
                { name: 'topic', type: 'String', description: 'The message topic.' },
                { name: 'data', type: 'Any', description: 'Data to attach to the message envelope.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'subscribe',
            description: 'Subscribe to one or more message topics. Returns numeric token(s) that can be used to unsubscribe message handlers.',
            arguments: [
                { name: 'topic', type: 'String | [String] | Object', description: 'A single message topic, array of topics or object map of topic names to handler functions.' },
                { name: 'func', type: 'Function(data, envelope)', description: 'The message handler function.' }
            ],
            returns: 'Number | [Number]'
        },
        {
            name: 'subscribeOnce',
            description: 'Subscribe to one or more message topics with a handler that is executed once only.',
            arguments: [
                { name: 'topic', type: 'String | [String] | Object', description: 'A single message topic, array of topics or object map of topic names to handler functions.' },
                { name: 'handler', type: 'Function(data, envelope)', description: 'The message handler function.' }
            ],
            returns: 'Number | [Number]'
        },
        {
            name: 'unsubscribe',
            description: 'Unsubscribe one or more message handlers.',
            arguments: [
                { name: 'tokens', type: 'Number | [Number]', description: 'A single subscription token or array of tokens to unsubscribe. Returns the token(s) that were successfully unsubscribed.' }
            ],
            returns: 'Number | [Number]'
        },
        {
            name: 'createLifetime',
            description: 'Create a child PubSub object where all subscriptions can be removed by calling .end().',
            returns: 'Object'
        },
        {
            name: 'startSaga',
            description: 'Start a saga with the specified definition.',
            arguments: [
                { name: 'definition', type: 'Object | Constructor', description: 'The object that contains the Saga definition or its constructor.' },
                { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
            ],
            returns: 'TC.Types.Saga'
        }

    ],
    properties: [
        {
            name: 'owner',
            description: 'The root PubSub object. Child lifetimes will refer back to the owning PubSub object.',
            type: 'Tribe.PubSub'
        },
        {
            name: 'sync',
            description: 'True if the PubSub object is operating synchronously.',
            type: 'Boolean'
        },
        {
            name: 'subscribers',
            description: 'A managed collection of message subscribers. Use get(\'*\') to retrieve all subscribers.',
            type: 'Tribe.PubSub.SubscriberList'
        }
    ]
};