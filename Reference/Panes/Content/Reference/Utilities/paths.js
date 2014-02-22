Reference.Path = [
    {
        name: 'T.Path',
        description: 'The Path function accepts a string containing a path, normalises the path and returns an object with several manipulation functions attached.',
        arguments: [{ name: 'path', type: 'String' }],
        returns: 'T.Path',
        examples: [{
            description: 'Most functions can be chained',
            code: "T.Path('Folder').makeAbsolute().combine('file.ext').withoutExtension().toString()",
            result: '/Folder/file'
        }]
    }
];

Reference.Path.Functions = [
    { name: 'withoutFilename', description: '', returns: 'T.Path' },
    { name: 'filename', description: '', returns: 'T.Path' },
    { name: 'extension', description: '', returns: 'String' },
    { name: 'withoutExtension', description: '', returns: 'T.Path' },
    { name: 'combine', description: '', arguments: [{ name: 'additionalPath' }], returns: 'T.Path' },
    { name: 'isAbsolute', description: '', returns: 'Boolean' },
    { name: 'makeAbsolute', description: '', returns: 'T.Path' },
    { name: 'makeRelative', description: '', returns: 'T.Path' },
    { name: 'asMarkupIdentifier', description: '', returns: 'String' },
    { name: 'setExtension', description: '', arguments: [{ name: 'extension' }], returns: 'T.Path' },
    { name: 'toString', description: '', returns: 'String' }
];