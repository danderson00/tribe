pack({
    to: 'Build/tests.js',
    include: tests()
});

pack({
    to: 'Build/tests.min.js',
    include: tests(true)
});

function tests(min) {
    return [
        testInclude('Composite/Tests', 'Composite', min),
        //testInclude('MessageHub/Client/Tests', 'MessageHub', min),
        //testInclude('PubSub/Tests', 'PubSub', min)
    ];
}

function testInclude(folder, modulePrefix, min) {
    return {
        files: folder + '/tests' + (min === true ? '.min' : '') + '.js',
        template: T.testModule('Tribe.' + modulePrefix)
    };
}