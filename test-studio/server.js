﻿require('tribe/driveLetterHack');

var path = require('path'),
    options = require('tribe/options');

options.testPaths = [
    path.resolve(__dirname, '../tests/server/'),
    path.resolve(__dirname, 'tests')
];
options.basePath = __dirname;

require('tribe').start();