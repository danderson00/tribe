pack({
    to: '../Build/Tests/Tribe.MessageHub.tests.js',
    include: [
        T.scripts('Resources/helpers.js', true),
        T.scripts('*.tests.js', true)
    ]
});