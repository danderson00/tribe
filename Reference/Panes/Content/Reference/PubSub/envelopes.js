Reference.PubSub.Envelopes = [
    { name: 'topic', type: 'String', description: 'The message topic.' },
    { name: 'data', type: 'Any', description: 'The message data.' },
    { name: 'sync', type: 'Boolean', description: 'Publish the message synchronously.' },
    { name: 'server', type: 'Boolean', description: 'True if the message originated from a Tribe.MessageHub host.' }
];