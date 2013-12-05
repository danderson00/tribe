Reference.PackScript = {
    options: [
        { Name: 'watch', Type: 'Boolean', Description: 'Makes PackScript stay active and watch for file changes.', Default: 'false' },
        { Name: 'logLevel', Type: 'String', Description: 'Logging verbosity. Can be debug, info, warn or error.', Default: 'debug' },
        { Name: 'packFileFilter', Type: 'String', Description: 'A filespec pattern to match pack files.', Default: '*pack.js' },
        { Name: 'configurationFileFilter', Type: 'String', Description: 'A filespec pattern to match configuration files.', Default: '*pack.config.js' },
        { Name: 'templateFileExtension', Type: 'String', Description: 'The file extension for template files.', Default: '.template.*' },
        { Name: 'resourcePath', Type: 'String', Description: 'An additional path to scan for templates and configuration files.', Default: 'undefined' },
        { Name: 'excludedDirectories', Type: 'String', Description: 'A semi-colon delimited list of folder names to exclude.', Default: 'csx;bin;obj' },
        { Name: 'rubyPath', Type: 'String', Description: 'The path to ruby.exe. Required for SASS integration.', Default: 'undefined' }
    ],
    pack: [
        { name: 'to', type: 'String', description: 'Destination path and filename for the output file.' },
        { name: 'include', type: 'include options', description: 'The set of files to include in the output. See "Including Files" for more details.' },
        { name: 'exclude', type: 'include options', description: 'A set of files to explicitly exclude.' },
        { name: 'template', type: 'template options', description: 'A template or array of templates to apply to each included file. See "Templates" reference for more details.' },
        { name: 'outputTemplate', type: 'template options', description: 'A template or array of templates to apply to the output.' },
        { name: 'recursive', type: 'Boolean', description: 'Recurse through directories by default when including files.' },
        { name: 'prioritise', type: 'String | Array', description: 'Specified file(s) will be included at the top of the output file.' },
        { name: 'first', type: 'String | Array', description: 'Alias for prioritise.' },
        { name: 'last', type: 'String | Array', description: 'Specified file(s) will be included at the bottom of the output file.' },
        { name: 'includeConfigs', type: 'Boolean', description: 'PackScript configuration files are excluded by default. Overrides this behaviour.' },
        { name: 'json', type: 'Any', description: 'Stringifies the provided object as the output. Overrides the output of any included files.' },
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
        { name: 'data', type: 'Any', description: 'The data object passed in the configuration file, or an empty object if not specified.' },
        { name: 'output', type: 'Output', description: 'The output configuration.' },
        { name: 'target', type: 'Container', description: 'The current output target.' }
    ],
    Builtin: {
        functions: [
            {
                Name: 'T.panes',
                Description: 'Package models, templates and styles for panes from the specified path.'
            },
            {
                Name: 'T.scripts',
                Description: 'Package JavaScript files with an extension of \'js\' from the specified path.'
            },
            {
                Name: 'T.templates',
                Description: 'Package HTML templates with an extension of \'htm\' from the specified path.'
            },
            {
                Name: 'T.styles',
                Description: 'Package CSS styles files with an extension of \'css\' from the specified path.'
            },
            {
                Name: 'T.models',
                Description: 'Package pane models from the specified path.'
            }
        ],
        arguments: [
            { Name: 'pathOrOptions', Type: 'String | Object', Description: 'Either the path containing relevant files or an object containing options.' },
            { Name: 'debug', Type: 'Boolean', Description: 'Use debug templates to enhance the debugging experience. You can also specify this using debug: true in your output configuration.' }
        ],
        options: [
            { name: 'path', type: 'String', description: 'Can either be a directory name or filespec containing the appropriate extension.' },
            { name: 'debug', type: 'Boolean', description: 'Use debug templates to enhance the debugging experience.' },
            { name: 'prefix', type: 'String', description: 'Prefix the resource path applied to models and templates.' },
            { name: 'domain', type: 'String', description: 'Specifies the domain to apply to each script in the debugger.' },
            { name: 'protocol', type: 'String', description: 'Specifies the protocol to apply to each script in the debugger.' },
            { name: 'recursive', type: 'Boolean', description: 'Set to false to override the default behaviour.' }
        ],
        helpers: [
            { Name: 'T.webTargets', Returns: 'target options', Description: 'Pass to the \'to\' function. Creates .js, .min.js and .debug.js outputs.' },
            { Name: 'T.webDependency', Returns: 'include options', Description: 'Returns an include with the appropriate extension, .js, .min.js or .debug.js.' }
        ]
    }
};