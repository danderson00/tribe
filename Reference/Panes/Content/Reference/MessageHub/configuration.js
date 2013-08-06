Reference.MessageHub.Server = [
    {
        name: 'TopicResolver',
        description: 'Specify a function to resolve message types to a topic names.',
        arguments: [
            { name: 'resolver', type: 'Func<Type, string>', description: 'A function that resolves a message type to a topic name' }
        ]
    },
    {
        name: 'TopicResolver<T>',
        description: 'Specify a type to resolve message types to a topic names. The default uses the type name as the client message topic.',
        arguments: [
            { name: '', type: 'IMessageTopicResolver', description: 'A type that implements IMessageTopicResolver' }
        ]
    },
    {
        name: 'MessageSerialiser<T>',
        description: 'Specify a type to serialise messages. The default is JsonMessageSerialiser.',
        arguments: [
            { name: '', type: 'IMessageSerialiser', description: 'A type that implements IMessageSerialiser' }
        ]
    },
    {
        name: 'MessageBus<T>',
        description: 'Specify a type that handles translation of client and server side messages.',
        arguments: [
            { name: '', type: 'IMessageBus', description: 'A type that implements IMessageBus' }
        ]
    },
    {
        name: 'MessagesFrom',
        description: 'Use incoming and outgoing message types from the specified assemblies.',
        arguments: [
            { name: 'assemblies', type: 'params Assembly[]', description: 'A parameter array of assemblies' }
        ]
    },
    {
        name: 'HostStarter<T>',
        description: 'Specify a type that can initialise and start the MessageHub host. The default is the IisHostStarter.',
        arguments: [
            { name: '', type: 'IHostStarter', description: 'A type that implements IHostStarter' }
        ]
    },
    {
        name: 'ChannelAuthoriser<T>',
        description: 'Specify a type that can authorise channel requests.',
        arguments: [
            { name: '', type: 'IChannelAuthoriser', description: 'A type that implements IChannelAuthoriser' }
        ]
    },
    {
        name: 'SqlServerPersistence',
        description: 'Store recorded messages in a SQL Server database. Requires a reference to the Tribe.MessageHub.ChannelPersisters.SqlServer assembly.',
        arguments: [
            { name: 'connectionStringOrName', type: 'String', description: 'A literal connection string or the name of a connection string defined in the configuration file' }
        ]
    },
    {
        name: 'NServiceBus',
        description: 'Use NServiceBus as the server side messaging infrastructure. Requires a reference to the Tribe.MessageHub.Buses.NServiceBus assembly.',
        arguments: [
            { name: 'bus', type: 'NServiceBus.IBus', description: 'A configured instance of the NServiceBus IBus interface' }
        ]
    },
];