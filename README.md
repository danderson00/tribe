# tribe

tribe is a completely different, more natural and concise way of building software.

This software is extremely experimental but represents a drastic reduction of complexity in the
process of building many different kinds of applications. Much more on this soon. For now, you want to check out the...

## Samples

https://github.com/danderson00/score

https://github.com/danderson00/tribe.samples

## Running Tests

### Install

    git clone https://github.com/danderson00/tribe.git
    cd tribe
    .\install.bat

This performs an npm install in each module folder and deletes duplicate references
to tribe modules. Yep. Windows. Sorry non-Windows people. Hassle me. @danderson00.

### Start Unit Test Server

    cd node_modules\tribe\test-studio\
    node --debug .\server.js

Open a browser to `http://localhost:1678/`.

Tests for individual modules can be run by navigating to the relevant module folder and running

    node --debug ..\tribe\test-studio\bin\test-studio

tribe.composite tests are built using QUnit and can be run by executing the
`host.js` module and opening a browser to `http://localhost:1678/Tests/`.

Problems? Comments? WTFs?
-------------------------

This is all highly experimental. Lots of dependencies. Shit is likely to not work.
"It works on my machine." Ping me at @danderson00, more than happy to help.
