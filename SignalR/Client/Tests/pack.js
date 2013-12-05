pack([
        T.scripts('Resources/helpers.js'),
        T.scripts('*.tests.js')
]).to({
    '../Build/Tests/Tribe.SignalR.tests.js': { debug: true },
    '../Build/Tests/Tribe.SignalR.tests.ie.js': { }
});