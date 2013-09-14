pack([
    T.scripts({ path: 'Infrastructure/*.js', debug: true, domain: 'Tests' }),
    T.scripts({ path: '*.tests.js', debug: true, domain: 'Tests' }),
    T.templates('*.htm')
]).to('../Build/Tests/Tribe.Forms.tests.js');