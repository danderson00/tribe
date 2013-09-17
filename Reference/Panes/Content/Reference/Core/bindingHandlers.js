Reference.BindingHandlers = [
    {
        name: 'publish',
        description: 'Publishes the specified message and data when the bound element is clicked.',
        bindings: [
            { Binding: 'publish', Type: 'String', Description: 'The message topic to publish.' },
            { Binding: 'data', Type: 'Any', Description: 'The data to publish.' }
        ],
        example: '<button data-bind="publish: \'messageTopic\', data: model.property">Click Me</button>'
    },
    {
        name: 'navigate',
        description: 'Navigates to the specified pane with the specified data when the bound element is clicked.',
        bindings: [
            { Binding: 'navigate', Type: 'String | Object', Description: 'The pane path or options to navigate to.' },
            { Binding: 'data', Type: 'Any', Description: 'The data to pass the target pane.' },
        ],
        example: '<button data-bind="navigate: \'/target/pane\', data: model.property">Click Me</button>'
    }
];