test-studio
===========

test-studio is a powerful web-based front end for node.js unit testing.

For an overview of features, check out this [blog post](http://www.danderson00.com/2014/05/test-studio-unit-testing-for-nodejs-how.html).

Installation
------------

    npm install -g test-studio

For debugger support, you also need to install node-inspector.

    npm install -g node-inspector

Operation
---------

Starting the test-studio server is as simple as running

    test-studio

This starts a web server on port 1678. By default, the current working directory
is scanned and monitored recursively for files with an extension of `.tests.js`.

If your existing suite conforms to mocha defaults, i.e. scan files with an extension
of `.js` in the `test` folder and use the `bdd` interface, invoke test-studio
with the `--mocha`, or `-m` option.

To see test-studio in action, you can run the system tests by passing the 
`--system` option.

test-studio can then be accessed by pointing your browser at

    http://localhost:1678/

Chrome is required for debugging.

Tests
-----

Currently, test-studio only supports [mocha](http://visionmedia.github.io/mocha/). 
More frameworks will be added given demand.

The default interface is TDD. This can be set using the `--interface` option.

    suite('math', function () {
        test('add sums arguments', function () {
            var math = require('math');
            expect(math.add(1, 1)).to.equal(2);
        });
    });

Various enhancements are available to assist testing.

### sinon

Spies, stubs and mocks are available through the `sinon` psuedo-global variable.

    var stub = sinon.stub().returns(42);

See [http://sinonjs.org/](http://sinonjs.org/) for full documentation.

### chaijs

The `expect` and `assert` functions from the chaijs assertion library are available 
as psuedo-global variables.

    expect(1 + 1).to.equal(2);

    assert.equal(1 + 1, 2);

See [http://chaijs.com/](http://chaijs.com/) for full documentation.

### Modules

test-studio provides simple mechanisms for forcing the refresh of modules or 
providing stubs in place of required modules.

    require.refresh('module');
    require.refreshAll();

    require.stub('module', { /* substitute */ });

Options
-------

    --help, -h, -?    Show command line usage options
    --run, -r         Run tests in command line mode
    --interface, -i   Mocha test API to use ("bdd", "tdd", "exports", etc.)
                                                                  [default: "tdd"]
    --testPath, -p    Path to test files
    --sourcePath, -s  Path to watch for file changes
    --filter, -f      Regular expression files must match to be included
                                               [string]  [default: "\.tests\.js$"]
    --debugPort       Port to use for debugging                  [default: "5859"]
    --inspectorPort   Port to expose node-inspector on (if installed)
                                                                 [default: "8081"]
    --reporter        Mocha test reporter to use when running in command line mode
                                                                  [default: "dot"]
    --mocha, -m       Use mocha defaults, i.e. tests from tests/*.js and bdd
                      interface
    --system          Run system tests

Issues / Feedback / Contribute
------------------------------

To log a bug, please open a new issue at https://github.com/danderson00/Tribe/issues.

For general feedback or if you're interested in contributing, please drop me a tweet 
at https://twitter.com/danderson00.

Source
------

test-studio is built on the [tribe](https://github.com/danderson00/Tribe) platform and
is embedded in the server product. 

Source for the client side implementation of test-studio is
[here](https://github.com/danderson00/Tribe/tree/master/node_modules/tribe/test-studio), 
the core server side code is
[here](https://github.com/danderson00/Tribe/tree/master/node_modules/tribe/test), 

License
-------

test-studio is licensed under the [MIT License](http://opensource.org/licenses/MIT).