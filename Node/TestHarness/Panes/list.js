T.registerModel(function (pane) {
    this.tests = flatten(pane.data);

    // should write a test for this
    function flatten(fixture) {
        var tests = fixture.tests,
            fixtures = fixture.fixtures;

        for (var fixtureName in fixtures)
            if(fixtures.hasOwnProperty(fixtureName))
                tests = tests.concat(flatten(fixtures[fixtureName]));
        
        return tests;
        //return _.flatten(_.map(fixture.fixtures, flatten), fixture.tests);
    }
});