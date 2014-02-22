Reference.Types.Models = {
    name: 'T.Types.Models',
    description: 'Managed collection of pane models.',
    functions: [
        {
            name: 'register',
            description: 'Register a model model with the collection. Registered models can be accessed as properties on the collection, keyed by resource path.',
            arguments: [
                { name: 'resourcePath', type: 'String', description: 'Associated pane path.' },
                { name: 'constructor', type: 'Function', description: 'Constructor function for the model.' },
                { name: 'options', type: 'Object', description: 'Options hashtable to store with the model.' }
            ],
            returns: ''
        }
    ]
};