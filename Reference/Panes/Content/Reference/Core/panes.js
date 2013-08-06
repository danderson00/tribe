Reference.Panes = {
    options: [
        { name: 'pane', type: 'String', description: 'Required. Relative paths will evaluate relative to the parent pane.' },
        { name: 'data', type: 'Any', description: 'Data to pass to the pane.' },
        { name: 'handlesNavigation', type: 'String | NavigationOptions', description: 'The underlying node is marked as the node to transition when child panes navigate.' },
        { name: 'transition', type: 'String', description: 'Transition to use when the pane is transitioned in or out.' },
        { name: 'reverseTransitionIn', type: 'Boolean', description: 'Use the reverse transition when transitioning in.' },
        { name: 'id', type: 'Any', description: 'An optional unique identifier for the pane.' },
        { name: 'skipPath', type: 'Boolean', description: 'When specified, the pane is skipped when determining the parent pane path.' }
    ]
};