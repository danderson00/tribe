Reference.API = [
    {
        name: 'TC.run',
        description: 'Start Tribe.Composite, ensuring the specified resources are loaded first.',
        arguments: [
            { name: 'resourcesToPreload', type: '[String]', description: 'URLs to required HTML, CSS or JS resources.' },
            { name: 'initialModel', type: 'Any', description: 'The model supplied to the initial ko.applyBindings call.' }
        ],
        returns: 'undefined'
    },
    {
        name: 'TC.createNode',
        description: 'Creates a new Pane object and binds it to the specified element with the specified pane options, and encapsulates it in a Node object.',
        arguments: [
            { name: 'element', type: 'selector | TC.Types.Node | TC.Types.Pane' },
            { name: 'paneOptions', type: 'Object' },
            { name: 'parentNode', type: 'TC.Types.Node' },
            { name: 'context', type: 'TC.Types.Context' }
        ],
        returns: 'TC.Types.Node'
    },
    {
        name: 'TC.appendNode',
        description: 'Same as createNode, but appends a new DIV element to the target element.',
        arguments: [
            { name: 'element', type: 'selector | TC.Types.Node | TC.Types.Pane' },
            { name: 'paneOptions', type: 'Object' },
            { name: 'parentNode', type: 'TC.Types.Node' },
            { name: 'context', type: 'TC.Types.Context' }
        ],
        returns: 'TC.Types.Node'
    },
    {
        name: 'TC.insertNodeAfter',
        description: 'Same as createNode, but inserts a new DIV element after the target element.',
        arguments: [
            { name: 'element', type: 'selector | TC.Types.Node | TC.Types.Pane' },
            { name: 'paneOptions', type: 'Object' },
            { name: 'parentNode', type: 'TC.Types.Node' },
            { name: 'context', type: 'TC.Types.Context' }
        ],
        returns: 'TC.Types.Node'
    },
    {
        name: 'TC.nodeFor',
        description: 'Find the Node object for the specified selector, Node or Pane.',
        arguments: [
            { name: 'element', type: 'selector | TC.Types.Node | TC.Types.Pane' }
        ],
        returns: 'TC.Types.Node'
    },
    {
        name: 'TC.registerModel',
        description: 'Registers a model in the repository. Either the TC.scriptEnvironment must be set first or a resourcePath must be specified.',
        arguments: [
            { name: 'modelConstructor', type: 'Function' },
            { name: 'options', type: 'Object' },
            { name: 'resourcePath', type: 'String' }
        ],
        returns: 'undefined'
    }
];