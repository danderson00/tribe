pack([
        T.scripts('Resources/helpers.js'),
        T.scripts('*.tests.js')
]).to({
    '../Build/Tests/Tribe.MessageHub.tests.js': { debug: true },
    '../Build/Tests/Tribe.MessageHub.tests.ie.js': { }
});