﻿require('tribe/driveLetterHack');

var pubsub = require('tribe.pubsub'),
    modules = require('tribe/server/modules'),
    log = require('tribe.logger'),
    _ = require('underscore'),
    path = require('path');

pubsub.options.sync = true;
pubsub.options.handleExceptions = false;

var options = module.exports = {
    apply: function (optionsToApply) {
        _.extend(options, optionsToApply)
        // use this to bump up the level at runtime
        log.setLevel(options.logLevel);
        return options;
    },

    port: 1678,
    appName: 'Tribe',
    logLevel: 'info',
    basePath: basePath(),
    modulePath: modulePath(),
    testPaths: testPaths(),
    browserTestPaths: browserTestPaths(),
    debug: debugMode(),
    debugPort: process.debugPort,
    inspectorPort: 8080,
    enhancedDebug: true,
    childProcess: false,
    watcherDelay: 200,
    rebuildThrottle: 200,
    startPane: '/layout',
    mobileStartPane: '/mobile/layout',
    //showDependencies: true, // we will eventually have a built-in app and service for spelunking dependencies
    builds: [
        {
            name: 'app',
            phases: ['prepare', 'render', 'output', 'server'],
            path: basePath(),
            tasks: [
                { activity: 'app' },
                { activity: 'dependencies', options: { path: 'dependencies' } },
                { activity: 'panes', options: { path: 'panes' } },
                { activity: 'resources', options: { path: 'actors' } },
                { activity: 'resources', options: { path: 'services' } },
                { activity: 'scripts', options: { path: 'scripts' } },
                { activity: 'styles', options: { path: 'styles' } },
                { activity: 'templates', options: { path: 'templates' } }
            ]
        },
        {
            name: 'tests',
            phases: ['prepare', 'render', 'output', 'server'],
            path: path.resolve(__dirname, 'test-studio'),
            tasks: [
                { activity: 'app' },
                { activity: 'panes', options: { path: 'panes' } },
                { activity: 'resources', options: { path: 'actors' } },
            ]
        },
        {
            name: 'tests.agent',
            phases: ['prepare', 'render', 'output', 'server'],
            path: basePath(),
            tasks: [
                { activity: 'panes', options: { path: 'panes' } },
                { activity: 'resources', options: { path: 'actors' } },
                { activity: 'tests.agent' },
                { activity: 'tests.browser', options: { path: 'tests/browser' } } // see below
            ]
        }
    ],
    server: {
        modules: dependencyModules().concat(dependencyModules('/tests')).concat([
            // map static directories
            modules.fs('/images', path.resolve(basePath(), 'images')),
            modules.fs('/tests/images', path.resolve(modulePath(), 'test-studio/images')),

            // memory file collections are created as part of builds
            // set directory default pages
            modules.memory.mapFile('/', 'app', 'app.htm'),
            modules.memory.mapFile('/tests/', 'tests', 'app.htm'),

            // map directories -- ensure child directories are done before the root directory
            modules.memory('/tests.agent', 'tests.agent'),
            modules.memory('/tests', 'tests'),
            modules.memory('/', 'app')
        ]),
        services: {
            '__tests': 'tribe/test/service'
        },
        operations: {
            'actor': 'tribe/server/operations/actor',
            'message': 'tribe/server/operations/message',
            'scope': 'tribe/server/operations/scope',
            'subscribe': 'tribe/server/operations/subscribe'
        }
    },
    test: {
        framework: 'mocha',
        mocha: {
            ui: 'tdd'
        },
        debugPort: 5859,
        restartThrottle: 200,
        fileFilter: /\.tests\.js$/,
        // suspending watchers causes all watchers against that path to be cancelled
        // will be resolved when file changes are broadcast using pubsub
        suspendWatchers: false, 
        browser: {
            runOnServer: false,
            loadApp: true
        }
    },
    storage: {
        type: 'sqlite3',
        filename: ':memory:'
    }
};

function basePath() {
    var basePath = require.resolve(process.argv[1]);
    basePath = basePath.substr(0, basePath.lastIndexOf(path.sep) + 1);
    return basePath[0].toLowerCase() + basePath.substring(1);
}

function modulePath() {
    return __dirname;
}

function debugMode() {
    return process.execArgv.indexOf('--debug') > -1 || process.execArgv.indexOf('--debug-brk') > -1;
}

// these will be replaced by the config system when implemented
function testPaths() {
    return [
        basePath() + 'tests/'
    ];
}

function browserTestPaths() {
    return [
        basePath() + 'tests/browser'
    ];
}

function dependencyModules(rootPath) {
    return [
        // static dependencies. looked at including these with npm and browserify but minification with uglifyjs on them sucks.
        modules.fs(dependencyPath('knockout'), path.resolve(modulePath(), 'node_modules/knockout/build/output')),
        modules.fs(dependencyPath('jquery'), path.resolve(modulePath(), 'node_modules/jquery/dist')),
        modules.fs(dependencyPath('socket.io'), path.resolve(modulePath(), 'node_modules/socket.io-client')),
        modules.fs(dependencyPath('composite'), path.resolve(modulePath(), 'node_modules/tribe.composite/Build'))
    ];

    function dependencyPath(dependency) {
        return (rootPath ? rootPath : '') + '/dependencies/' + dependency;
    }
}
