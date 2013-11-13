pack([
    T.scripts({ path: 'Infrastructure/*.js', domain: 'Tests' }),
    T.scripts({ path: '*.tests.js', domain: 'Tests' }),
    T.templates('Integration/*.htm')
]).to({
    '../Build/Tests/Tribe.Forms.tests.js': { debug: true },
    '../Build/Tests/Tribe.Forms.tests.ie.js': { }
});