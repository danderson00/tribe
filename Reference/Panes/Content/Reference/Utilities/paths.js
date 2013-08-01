Reference.Path = [
    {
        name: 'TC.Path',
        description: 'The Path function accepts a string containing a path, normalises the path and returns an object with several manipulation functions attached.',
        arguments: [{ name: 'path', type: 'String' }],
        returns: 'TC.Path',
        examples: [{
            description: 'Most functions can be chained',
            code: "TC.Path('Folder').makeAbsolute().combine('file.ext').withoutExtension().toString()",
            result: '/Folder/file'
        }]
    }
];

Reference.Path.Functions = [
    { name: 'withoutFilename', description: '', returns: 'TC.Path' },
    { name: 'filename', description: '', returns: 'TC.Path' },
    { name: 'extension', description: '', returns: 'String' },
    { name: 'withoutExtension', description: '', returns: 'TC.Path' },
    { name: 'combine', description: '', arguments: [{ name: 'additionalPath' }], returns: 'TC.Path' },
    { name: 'isAbsolute', description: '', returns: 'Boolean' },
    { name: 'makeAbsolute', description: '', returns: 'TC.Path' },
    { name: 'makeRelative', description: '', returns: 'TC.Path' },
    { name: 'asMarkupIdentifier', description: '', returns: 'String' },
    { name: 'setExtension', description: '', arguments: [{ name: 'extension' }], returns: 'TC.Path' },
    { name: 'toString', description: '', returns: 'String' }
];