Reference.MessageHub = [
    {
        name: 'TMH.initialise',
        description: 'Initialise the MessageHub client.',
        returns: 'undefined',
        arguments: [
            { name: 'pubsub', type: 'Tribe.PubSub', description: 'The PubSub object to attach to.' },
            { name: 'url', type: 'String', description: 'The URL of the SignalR instance. Usually "signalr".' }
        ]
    },
    {
        name: 'TMH.joinChannel',
        description: 'Join the specified channel.',
        returns: '{ leave: function () { } }',
        arguments: [
            { name: 'id', type: 'String', description: 'The channel identifier.' },
            { name: 'options', type: 'Object', description: 'A hashtable of options, described below.' }
        ]
    },
    {
        name: 'TMH.leaveChannel',
        description: 'Leave the specified channel.',
        returns: 'undefined',
        arguments: [
            { name: 'id', type: 'String', description: 'The channel identifier.' }
        ]
    },
    {
        name: 'TMH.publishToServer',
        description: 'Publish a message to the server.',
        returns: 'undefined',
        arguments: [
            { name: 'channelId', type: 'String', description: 'The channel identifier.' },
            { name: 'envelope', type: 'Object', description: 'The PubSub message envelope. See the PubSub reference for more information.' },
            { name: 'record', type: 'Boolean', description: 'Request the server to record the message.' }
        ]
    }
];

Reference.MessageHub.ChannelOptions = [
    { name: 'serverEvents', type: '[String]', description: 'An array of message topics to publish to the server. Wildcards can be used.' },
    { name: 'record', type: 'Boolean', description: 'Request the server to record messages published to this channel.' },
    { name: 'replay', type: 'Boolean', description: 'Request the server to replay messages previously published to this channel.' }
];