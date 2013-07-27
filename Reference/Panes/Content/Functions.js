Functions = {
    API: [
        {
            name: 'TC.run',
            description: 'Start Tribe.Composite, ensuring the specified resources are loaded first.',
            arguments: [
                { name: 'resourcesToPreload', type: 'array of string', description: 'URLs to required HTML, CSS or JS resources' },
                { name: 'initialModel', type: 'any', description: 'The model supplied to the initial ko.applyBindings call' }
            ]
        },
        {
            name: 'TC.createNode',
            description: 'Creates a new Pane object and binds it to the specified element with the specified pane options.',
            arguments: [
                { name: 'element', type: 'selector | HTMLElement | Node | Pane' },
                { name: 'paneOptions', type: 'object' },
                { name: 'parentNode', type: 'TC.Types.Node' },
                { name: 'context', type: 'TC.Types.Context' }
            ]
        },
        {
            name: 'TC.appendNode',
            description: '',
            arguments: [
                { name: 'element', type: 'selector | HTMLElement | Node | Pane' },
                { name: 'paneOptions', type: 'object' },
                { name: 'parentNode', type: 'TC.Types.Node' },
                { name: 'context', type: 'TC.Types.Context' }
            ]
        },
        {
            name: 'TC.insertNodeAfter',
            description: '',
            arguments: [
                { name: 'element', type: 'selector | HTMLElement | Node | Pane' },
                { name: 'paneOptions', type: 'object' },
                { name: 'parentNode', type: 'TC.Types.Node' },
                { name: 'context', type: 'TC.Types.Context' }
            ]
        },
        {
            name: 'TC.nodeFor',
            description: '',
            arguments: [
                { name: 'element', type: 'selector | HTMLElement | Node | Pane' }
            ]
        },
        {
            name: 'TC.registerModel',
            description: 'Registers a model in the repository. Either the TC.scriptEnvironment must be set first or a resourcePath must be specified.',
            arguments: [
                { name: 'modelConstructor', type: 'function' },
                { name: 'options', type: 'object' },
                { name: 'resourcePath', type: 'string' }
            ]
        }
    ],
    Utils: {

    }
};