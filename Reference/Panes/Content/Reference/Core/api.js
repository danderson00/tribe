Reference.API = [
    {
        name: 'T.run',
        description: 'Start Tribe.Composite, ensuring the specified resources are loaded first.',
        arguments: [
            { name: 'resourcesToPreload', type: '[String]', description: 'URLs to required HTML, CSS or JS resources.' },
            { name: 'initialModel', type: 'Any', description: 'The model supplied to the initial ko.applyBindings call.' }
        ],
        returns: 'undefined'
    },
    {
        name: 'T.createNode',
        description: 'Creates a new Pane object and binds it to the specified element with the specified pane options, and encapsulates it in a Node object.',
        arguments: [
            { name: 'element', type: 'selector | T.Types.Node | T.Types.Pane' },
            { name: 'paneOptions', type: 'Object' },
            { name: 'parentNode', type: 'T.Types.Node' },
            { name: 'context', type: 'T.Types.Context' }
        ],
        returns: 'T.Types.Node'
    },
    {
        name: 'T.appendNode',
        description: 'Same as createNode, but appends a new DIV element to the target element.',
        arguments: [
            { name: 'element', type: 'selector | T.Types.Node | T.Types.Pane' },
            { name: 'paneOptions', type: 'Object' },
            { name: 'parentNode', type: 'T.Types.Node' },
            { name: 'context', type: 'T.Types.Context' }
        ],
        returns: 'T.Types.Node'
    },
    {
        name: 'T.insertNodeAfter',
        description: 'Same as createNode, but inserts a new DIV element after the target element.',
        arguments: [
            { name: 'element', type: 'selector | T.Types.Node | T.Types.Pane' },
            { name: 'paneOptions', type: 'Object' },
            { name: 'parentNode', type: 'T.Types.Node' },
            { name: 'context', type: 'T.Types.Context' }
        ],
        returns: 'T.Types.Node'
    },
    {
        name: 'T.nodeFor',
        description: 'Find the Node object for the specified selector, Node or Pane.',
        arguments: [
            { name: 'element', type: 'selector | T.Types.Node | T.Types.Pane' }
        ],
        returns: 'T.Types.Node'
    },
    {
        name: 'T.registerModel',
        description: 'Registers a model in the repository. Either the T.scriptEnvironment must be set first or a resourcePath must be specified.',
        arguments: [
            { name: 'modelConstructor', type: 'Function' },
            { name: 'options', type: 'Object' },
            { name: 'resourcePath', type: 'String' }
        ],
        returns: 'undefined'
    }
];