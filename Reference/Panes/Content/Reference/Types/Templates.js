Reference.Types.Templates = {
    name: 'T.Types.Templates',
    description: 'Managed collection of HTML templates.',
    functions: [
        {
            name: 'store',
            description: 'Store the specified template, keyed by the specified path',
            arguments: [
                { name: 'template', type: 'String' },
                { name: 'path', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'loaded',
            description: 'Checks whether the template for the specified path has been loaded',
            arguments: [
                { name: 'path', type: 'String' }
            ],
            returns: 'Boolean'
        },
        {
            name: 'render',
            description: 'Render the template for the specified path to the specified target',
            arguments: [
                { name: 'target', type: 'selector' },
                { name: 'path', type: 'string' }
            ],
            returns: 'undefined'
        }
    ]
};