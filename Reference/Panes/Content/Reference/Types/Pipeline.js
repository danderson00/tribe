Reference.Types.Pipeline = {
    name: 'T.Types.Pipeline',
    description: 'Manages the step by step execution of a number of named events. Each step will only execute after the promise returned by the previous step resolves. A rejected promise will halt execution of the pipeline.',
    constructor: {
        arguments: [
            { name: 'events', type: 'Object', description: 'Hashtable of event handler functions, keyed by the event name.' },
            { name: 'context', type: 'Any', description: 'Context data that is passed to each event function.' }
        ]
    },
    functions: [
        {
            name: 'execute',
            description: 'Execute the specified events against the specified target.',
            arguments: [
                { name: 'eventsToExecute', type: '[String]', description: 'Ordered array of events to execute against the target.' },
                { name: 'target', type: 'Object', description: 'Target object to pass to each event handler function.' }
            ],
            returns: 'jQuery.Deferred'
        }
    ]
};