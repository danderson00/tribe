Reference.PackScript = {
    pack: [
        { name: 'to', type: 'String', description: 'Destination path and filename for the output file.' },
        { name: 'include', type: 'include options', description: 'The set of files to include in the output. See below for more details.' },
        { name: 'exclude', type: 'include options', description: 'A set of files to explicitly exclude.' },
        { name: 'template', type: 'template options', description: 'A template or array of templates to apply to each included file. See templates reference for more details.' },
        { name: 'outputTemplate', type: 'template options', description: 'A template or array of templates to apply to the output.' },
        { name: 'recursive', type: 'Boolean', description: 'Recurse through directories by default when including files.' },
        { name: 'prioritise', type: 'String | Array', description: 'Specified file(s) will be included at the top of the output file.' },
        { name: 'first', type: 'String | Array', description: 'Alias for prioritise.' },
        { name: 'last', type: 'String | Array', description: 'Specified file(s) will be included at the bottom of the output file.' },
        { name: 'includeConfigs', type: 'Boolean', description: 'PackScript configuration files are excluded by default. Overrides this behaviour.' },
        { name: 'minify', type: 'Boolean', description: 'Minify resources using the configured minifier.' },
        { name: 'sass', type: 'Boolean', description: 'Compile included SASS resources using the configured compiler.' },
        { name: 'xdt', type: 'String | Array', description: 'Apply specified XDT transformations to included files.' }
    ],
    sync: [
        { name: 'to', type: 'String', description: 'Destination path to synchronise files to.' },
        { name: 'include', type: 'include options', description: 'The set of files to synchronise.' },
        { name: 'exclude', type: 'include options', description: 'A set of files to explicitly exclude.' },
        { name: 'recursive', type: 'Boolean', description: 'Recurse through directories by default when including files.' },
        { name: 'includeConfigs', type: 'Boolean', description: 'PackScript configuration files are excluded by default. Overrides this behaviour.' }
    ],
    zip: [
        { name: 'to', type: 'String', description: 'Destination path and filename for the output ZIP file.' },
        { name: 'include', type: 'include options', description: 'The set of files to include in the ZIP file.' },
        { name: 'exclude', type: 'include options', description: 'A set of files to explicitly exclude.' },
        { name: 'recursive', type: 'Boolean', description: 'Recurse through directories by default when including files.' },
        { name: 'includeConfigs', type: 'Boolean', description: 'PackScript configuration files are excluded by default. Overrides this behaviour.' }
    ],
    includeOptions: [
        { name: 'files', type: 'String', description: 'File specification of files to include.' },
        { name: 'recursive', type: 'Boolean', description: 'Recurse through directories by default when including files.' },
        { name: 'prioritise', type: 'String | Array', description: 'Specified file(s) will be included at the top of the output file.' },
        { name: 'first', type: 'String | Array', description: 'Alias for prioritise.' },
        { name: 'last', type: 'String | Array', description: 'Specified file(s) will be included at the bottom of the output file.' },
        { name: 'template', type: 'template options', description: 'A template or array of templates to apply to each included file. See templates reference for more details.' }
    ],
    functions: [
        { name: 'pack', description: 'Combine, minify, embed and transform into a single output file.' },
        { name: 'sync', description: 'Synchronise a set of files to a target directory.' },
        { name: 'zip', description: 'Compress a set of files into a single ZIP format archive.' }
    ],
    templateProperties: [
        { name: 'content', type: 'String', description: 'The content of the included file.' },
        { name: 'path', type: 'String', description: 'The full path to the included file.' },
        { name: 'configPath', type: 'String', description: 'The full path to the configuration file that is using the template.' },
        { name: 'pathRelativeToConfig', type: 'String', description: 'The path of the included file relative to the configuration file.' },
        { name: 'includePath', type: 'String', description: 'The full path to the path specified in the include option.' },
        { name: 'pathRelativeToInclude', type: 'String', description: 'The path of the included file relative to the path specified in the include option.' },
        { name: 'data', type: 'Any', description: 'The data object passed in the configuration file, or an empty object if not specified.' }
    ],
    builtins: [
    {
        name: 'T.',
        description: '',
        arguments: [
            { name: '', type: '', description: '' },
        ],
        returns: ''
    },
    ]
};

/*
T.panes(folderOrOptions, chrome)
T.scripts(folderOrOptions, chrome)
T.templates(folderOrOptions)
T.styles(folderOrOptions)
*/