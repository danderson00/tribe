Reference.Transition = {
    name: 'TC.transition',
    description: 'Create an object with a set of functions for transition elements and nodes.',
    arguments: [
        { name: 'target', type: 'selector | TC.Types.Pane | TC.Types.Node', description: 'The target of the transition.' },
        { name: 'transition', type: 'String', description: 'The name of the transition registered in the TC.Transitions collection. If not specified, this will default to transition specified on the pane or node.<br/>Built-in transitions are fade, slideLeft, slideRight, slideUp and slideDown.' },
        { name: 'reverse', type: 'Boolean', description: 'Use the reverse transition to the one specified.' }
    ],
    returns: 'Object'
};

Reference.Transition.Functions = [
    {
        name: 'in',
        description: 'Transition the target into view. Returned promise resolves when transition is complete.',
        returns: 'jQuery.Deferred'
    },
    {
        name: 'out',
        description: 'Transition the target out of view. By default, the target is removed from the DOM after transitioning. Returned promise resolves when transition is complete.',
        arguments: [
            { name: 'remove', type: 'Boolean', description: 'Specify false to hide the target instead.' }
        ],
        returns: 'jQuery.Deferred'
    },
    {
        name: 'to',
        description: 'Transition the target to another pane. If the target is an element, a new node is created. Returned promise resolves when the render operation for the new pane is complete.',
        arguments: [
            { name: 'paneOptions', type: 'String | Object', description: 'The path to the new pane or an object containing path and data properties.' },
            { name: 'remove', type: 'Boolean', description: 'Specify false to hide the original target instead of removing.' }
        ],
        returns: 'jQuery.Deferred'
    }
];