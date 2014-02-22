Reference.Types.Logger = {
    name: 'T.Types.Logger',
    description: 'Provides a unified API for logging functionality',
    functions: [
        {
            name: 'debug',
            description: '',
            arguments: [
                { name: 'message', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'info',
            description: '',
            arguments: [
                { name: 'message', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'warn',
            description: '',
            arguments: [
                { name: 'message', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'error',
            description: '',
            arguments: [
                { name: 'message', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'setLogLevel',
            description: '',
            arguments: [
                { name: 'level', type: 'Number', description: 'Number corresponding with the desired log level - 0 = debug, 4 = none.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'setLogger',
            description: 'Set the underlying logging mechanism registed in the T.Loggers collection. Default is \'console\'.',
            arguments: [
                { name: 'newLogger', type: 'String' }
            ],
            returns: 'undefined'
        }
    ]
};