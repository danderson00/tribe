Reference.Types.Loader = {
    name: 'TC.Types.Loader',
    description: 'Ensures URLs are only loaded once. Concurrent requests return the same promise. The actual loading of resources is performed by specific LoadHandlers.',
    functions: [
        {
            name: 'get',
            description: 'Load the specified URL using the LoadHandler that corresponds with the file extension. Returns the result of executing the LoadHandler, usually a jQuery.Deferred.',
            arguments: [
                { name: 'url', type: 'String', description: 'The URL to load.' },
                { name: 'resourcePath', type: 'String', description: 'The resource path to pass to the LoadHandler.' },
                { name: 'context', type: 'Any', description: 'A context object to pass to the LoadHandler.' }
            ],
            returns: 'jQuery.Deferred'
        }
    ]
};