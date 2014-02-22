Reference.Types.Operation = {
    name: 'T.Types.Operation',
    description: 'Encapsulates an operation involving several child operations, keyed by an id. Child operations can be added cumulatively. Promise resolves when the all child operations complete.',
    functions: [
        {
            name: 'add',
            description: 'Add an id corresponding with a child operation',
            arguments: [
                { name: 'id', type: 'Any' }
            ],
            returns: 'undefined'
        },
        {
            name: 'complete',
            description: 'Mark the specified id is being complete',
            arguments: [
                { name: 'id', type: 'Any' }
            ],
            returns: 'undefined'
        }
    ],
    properties: [
        {
            name: 'promise',
            description: 'The promise object representing the state of the operation.',
            type: 'jQuery.Deferred'
        },
    ]
};