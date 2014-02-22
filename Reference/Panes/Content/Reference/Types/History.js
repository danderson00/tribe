Reference.Types.History = {
    name: 'T.Types.History',
    description: 'Maintains the state of the browser history stack, including URL data.',
    constructor: {
        arguments: [
            { name: 'history', type: 'window.History', description: 'An object that exposes an interface matching that of the window.History object.' }
        ]
    },
    functions: [
        {
            name: 'navigate',
            description: 'Load a history entry onto the stack.',
            arguments: [
                { name: 'urlOptions', type: 'Object', description: 'An object containing url and title properties.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'go',
            description: 'Move the current stack frame forward or back the specified number of frames, triggering the browser.go document event.',
            arguments: [
                { name: 'frameCount', type: 'Number' }
            ],
            returns: 'undefined'
        },
        {
            name: 'update',
            description: 'Move the current stack frame forward or back the specified number of frames, WITHOUT triggering the browser.go document event.',
            arguments: [
                { name: 'frameCount', type: 'Number' }
            ],
            returns: 'undefined'
        },
        {
            name: 'dispose',
            description: 'Clean up resources used by the History object.',
            returns: 'undefined'
        }
    ]
};